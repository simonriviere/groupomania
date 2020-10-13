const { Sequelize, DataTypes } = require('sequelize');
const sql = new Sequelize('groupomania', 'root', 'MdpPourLeP7!', {
  host: 'localhost',
  dialect: 'mysql',

});
try {
  sql.authenticate();
  console.log('User est Connecté a la bdd mysql')
} catch (error) {
  console.log('Pas connecté, error');
}
const User = require('../models/user')(sql, DataTypes);
const bcrypt = require('bcrypt'); // crypte les mots de passe
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      sql.query(`INSERT INTO User (email, password) VALUES('${user.email}','${user.password}')`)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));


};
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then((user) => {
      
      if (!user) {
        return res.status(401).send({ error });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user.id },
                '93U3hhBY_Vhchm3tr_dAjqAGDq_HDNVF33g_VKxwzn_bTPuqng_5MRaZJ5p_hPutBUCk_n7LPMAp_3K3vVGqn_hYBBpizj_6FZ4LN6_7njqjnzv_Q7tUs96_X9NgVLC_tKQhr4e_4xKj7e3f_HJKzy_BFyycxAw_zQTftN6q_TSzS4DzC_KKzvjm_NJUojn_GB4cqmu_HL_p2AS5_q_iUkJF7L_pXoqpC_UjCz4Z2_5Sdg4_FjZ9pyS_M7HiQ_9UD56jT_ggmQWSsU_bXr6C4p_tf3PsMK_jmaE3A_W7ATv_f9uSR_NRtg_mY_gQJYL_kq3_aibrS899_bsxZoJfK_v22sUDYi',
                { expiresIn: '24h' })
            
            });
          
          })
          
          .catch(error => res.status(500).json({ error }));
      }

    })
    .catch(error => res.status(500).json({ error }));
};


/* exports.login = (req, res, next) => {
 // User.findOne({ email: req.body.email })
  sql.query(`SELECT email FROM User WHERE email ='${req.body.email}'`)
    .then(user => {
        //console.log(user)
      if (user===null) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      const password = sequelize.query(`SELECT password  FROM User WHERE email='riviere.simon@me.fr'`);
      console.log(password)
      bcrypt.compare(req.body.password, password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Le mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              '93U3hhBY_Vhchm3tr_dAjqAGDq_HDNVF33g_VKxwzn_bTPuqng_5MRaZJ5p_hPutBUCk_n7LPMAp_3K3vVGqn_hYBBpizj_6FZ4LN6_7njqjnzv_Q7tUs96_X9NgVLC_tKQhr4e_4xKj7e3f_HJKzy_BFyycxAw_zQTftN6q_TSzS4DzC_KKzvjm_NJUojn_GB4cqmu_HL_p2AS5_q_iUkJF7L_pXoqpC_UjCz4Z2_5Sdg4_FjZ9pyS_M7HiQ_9UD56jT_ggmQWSsU_bXr6C4p_tf3PsMK_jmaE3A_W7ATv_f9uSR_NRtg_mY_gQJYL_kq3_aibrS899_bsxZoJfK_v22sUDYi',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}; */