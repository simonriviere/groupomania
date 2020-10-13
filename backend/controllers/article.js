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
const Article = require('../models/article')(sequelize, DataTypes);

exports.createArticle = (req, res, next) => {

  const createArticle = req.body
  delete createArticle._id;
  // l'id est fournis automatiquement du coup on ne récupère pas celui du front
  const article = new Article({
    ...createArticle,
    //image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sequelize.query(`INSERT INTO Articles (titre, commentaire, image, userId) VALUES('${article.titre}','${article.commentaire}','${article.image}','${article.userId}') `)
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyArticle = (req, res, next) => {
  const article = req.body
  sequelize.query(`UPDATE Articles SET titre='${article.titre}',commentaire='${article.commentaire}',image='${article.image}' WHERE id= '${req.params.id}'`)
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteArticle = (req, res, next) => {
  sequelize.query(`DELETE FROM Articles WHERE id ='${req.params.id}' `)
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneArticle = (req, res, next) => {
  console.log(req.params.id)
  sequelize.query(`SELECT * FROM Articles WHERE id ='${req.params.id}'`)
    //Article.findOne({ _id: req.params.id })
    .then(
      (article) => res.status(200).json(article))
    .catch(
      error => res.status(404).json({
        error
      }));
}

exports.getAllArticle = (req, res, next) => {
  sequelize.query("SELECT * FROM Articles")
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({ error }));
};
