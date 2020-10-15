const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', 'MdpPourLeP7!', {
  host: 'localhost',
  dialect: 'mysql',

});
try {
  sequelize.authenticate();
  console.log('Connecté a la bdd mysql')
} catch (error) {
  console.log('Pas connecté, error');
}
const Com = require('../models/com')(sequelize, DataTypes);
exports.createCom = (req, res, next) => {
  const createCom = req.body
  // l'id est fournis automatiquement du coup on ne récupère pas celui du front
  const com = new Com({
    ...createCom,
    //image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sequelize.query(`INSERT INTO Commentaire (message, articleId, userId) VALUES('${com.message}','${com.articleId}','${com.userId}') `)
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};
exports.modifyCom = (req, res, next) => {
  if (req.body.userId == null) {
    return res.status(401).send({ error});
  } else {
    const com = req.body
    sequelize.query(`UPDATE Commentaire SET message='${com.message}',articleId='${com.articleId}', userId='${com.userId}' WHERE id= '${req.params.id}'`)
      .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
      .catch(error => res.status(400).json({ error }));
  }
};
exports.deleteCom = (req, res, next) => {
  if (req.body.userId == null) {
    return res.status(401).send({ error });
  } else {
    sequelize.query(`DELETE FROM Commentaire WHERE id ='${req.params.id}' `)
      .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
      .catch(error => res.status(400).json({ error }));
  }

};
exports.getOneCom = (req, res, next) => {

  sequelize.query(`SELECT * FROM Commentaire WHERE id ='${req.params.id}'`)
    //Article.findOne({ _id: req.params.id })
    .then(
      (com) => res.status(200).json(com))
    .catch(
      error => res.status(404).json({
        error
      }));
}
exports.getAllCom = (req, res, next) => {
  sequelize.query("SELECT Commentaire.message,Commentaire.likeArticle,Commentaire.dislikeArticle,Commentaire.articleId FROM `Articles`, `Commentaire` WHERE Articles.id = Commentaire.articleId;")
    .then(coms => res.status(200).json(coms))
    .catch(error => res.status(400).json({ error }));
};
