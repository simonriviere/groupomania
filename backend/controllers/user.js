const { Sequelize, DataTypes } = require('sequelize');
const sql = new Sequelize('groupomania', 'root', 'MdpPourLeP7!', {
  host: 'localhost',
  dialect: 'mysql',

});

const User = require('../models/user')(sql, DataTypes);
const bcrypt = require('bcrypt'); // crypte les mots de passe
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      });
      sql.query(`INSERT INTO User (pseudo, email, password) VALUES('${user.pseudo}','${user.email}','${user.password}')`)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));


};
exports.login = (req, res, next) => {
  User.findOne({
    where: { pseudo: req.body.pseudo }
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } else {
              res.status(201).json({
                message: 'Utilisateur connecté',
                userId: user.id,
                nom : user.nom,
                pseudo : req.body.pseudo,
                email : user.email,
                roles : ["ROLE_USER", "ROLE_MODERATEUR", "ROLE_ADMIN"],
                token: jwt.sign(
                  { userId: user.id },
                  '93U3hhBY_Vhchm3tr_dAjqAGDq_HDNVF33g_VKxwzn_bTPuqng_5MRaZJ5p_hPutBUCk_n7LPMAp_3K3vVGqn_hYBBpizj_6FZ4LN6_7njqjnzv_Q7tUs96_X9NgVLC_tKQhr4e_4xKj7e3f_HJKzy_BFyycxAw_zQTftN6q_TSzS4DzC_KKzvjm_NJUojn_GB4cqmu_HL_p2AS5_q_iUkJF7L_pXoqpC_UjCz4Z2_5Sdg4_FjZ9pyS_M7HiQ_9UD56jT_ggmQWSsU_bXr6C4p_tf3PsMK_jmaE3A_W7ATv_f9uSR_NRtg_mY_gQJYL_kq3_aibrS899_bsxZoJfK_v22sUDYi',
                  { expiresIn: '24h' }),
              });
            }

          })
          .catch(error => res.status(500).json({ error }));
      }

    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {

  if (req.body.userId == null) {
    return res.status(401).send({ error });
  } else {
    const auth = req.body
    sql.query(`UPDATE User SET nom='${auth.nom}',prenom='${auth.prenom}',sexe='${auth.sexe}',pseudo='${auth.pseudo}', imageProfil='${auth.imageProfil}'WHERE id= '${req.params.id}'`)
      .then(() => res.status(200).json({ message: 'User modifié !' }))
      .catch(error => res.status(400).json({ error }));
  }
};

exports.deleteUser = (req, res, next) => {

  sql.query(`DELETE FROM User WHERE id ='${req.params.id}' `)
    .then(() => res.status(200).json({ message: 'User supprimé !' }))
    .catch(error => res.status(400).json({ error }));


};

exports.getOneUser = (req, res, next) => {
  if (req.body.userId == null) {
    return res.status(401).send({ error });
  } else {
    sql.query(`SELECT * FROM User WHERE id ='${req.params.id}'`)
      .then(
        (user) => res.status(200).json(user))
      .catch(
        error => res.status(404).json({
          error
        }));
  }
}

exports.getAllUser = (req, res, next) => {
  sql.query("SELECT * FROM User")
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};
