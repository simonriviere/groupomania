/* const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const sql = new Sequelize('groupomania', 'root', 'MdpPourLeP7!', {
  host: 'localhost',
  dialect: 'mysql',

}); */
const db = require("../models/");
const Users = db.user;
const Op = db.Sequelize.Op;

//const User = require('../models/user')(sql, DataTypes);
const bcrypt = require('bcrypt'); // crypte les mots de passe
const jwt = require('jsonwebtoken');


let role = "";
exports.signup = (req, res, next) => {
  if(req.body.email === "riviere.simon@me.fr"){
    role = "MODO"
  }else {
    role = "USER"
  }
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    console.log(role)
    const user = {
        pseudo: req.body.pseudo,
        email: req.body.email,
        role : role,
        password: hash
      };
      Users.create(user)
      .then(user => {
        res.send({user,
          message : "Utilisateur bien enregistré"
        
        });
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
        });
      });
    })
    .catch(error => res.status(500).json({ error }));


};
exports.login = (req, res, next) => {
  Users.findOne({
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
                userId: user.id,
                token: jwt.sign(
                  { userId: user.id },
                  '93U3hhBY_Vhchm3tr_dAjqAGDq_HDNVF33g_VKxwzn_bTPuqng_5MRaZJ5p_hPutBUCk_n7LPMAp_3K3vVGqn_hYBBpizj_6FZ4LN6_7njqjnzv_Q7tUs96_X9NgVLC_tKQhr4e_4xKj7e3f_HJKzy_BFyycxAw_zQTftN6q_TSzS4DzC_KKzvjm_NJUojn_GB4cqmu_HL_p2AS5_q_iUkJF7L_pXoqpC_UjCz4Z2_5Sdg4_FjZ9pyS_M7HiQ_9UD56jT_ggmQWSsU_bXr6C4p_tf3PsMK_jmaE3A_W7ATv_f9uSR_NRtg_mY_gQJYL_kq3_aibrS899_bsxZoJfK_v22sUDYi',
                  { expiresIn: "10h" }),
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      }

    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  const id = req.params.id;
  const newProfile = req.file ? {
    nom: req.body.nom,
    prenom : req.body.prenom,
    sexe : req.body.sexe,
    pseudo : req.body.pseudo,
    imageProfil : `${req.protocol}://${req.get('host')}/imagesProfile/${req.file.filename}`
 } : {
  nom: req.body.nom,
  prenom : req.body.prenom,
  sexe : req.body.sexe,
  pseudo : req.body.pseudo,
  
    }
    
  Users.update(newProfile, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur modifié."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour l'utilisateur avec l'id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la mise à jour id=" + id
      });
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur supprimé!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer id=${id}. `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Users with id=" + id
      });
    });
};

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
}

exports.getAllUser = (req, res, next) => {
 Users.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
