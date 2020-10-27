const db = require("../models/");
const Articles = db.articles;
const Op = db.Sequelize.Op;

exports.createArticle = (req, res, next) => {

  const article = {
    titre: req.body.titre,
    message: req.body.message,
    userId: req.body.userId,
    image: `${req.protocol}://${req.get('host')}/images/${req.body.image}`,
  };
  Articles.create(article)
    .then(article => {
      res.send(article);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

};

exports.modifyArticle = (req, res, next) => {
  if (req.body.userId == null) {
    return res.status(401).send({ error: "userId pas définit" });
  } else {
    const article = req.body
    sequelize.query(`UPDATE Articles SET titre='${article.titre}',message='${article.message}',image='${article.image}', dateModification = LOCALTIME, userId='${article.userId}' WHERE id= '${req.params.id}'`)
      .then(() => res.status(200).json({ message: 'Article modifié !' }))
      .catch(error => res.status(400).json({ error }));
  }
};

exports.deleteArticle = (req, res, next) => {
  if (req.body.userId == null) {
    return res.status(401).send({ error });
  } else {
    sequelize.query(`DELETE FROM Articles WHERE id ='${req.params.id}' `)
      .then(() => res.status(200).json({ message: 'Article supprimé !' }))
      .catch(error => res.status(400).json({ error }));
  }

};

exports.getOneArticle = (req, res, next) => {
  console.log(req.params.id)
  sequelize.query(`SELECT * FROM Articles WHERE id ='${req.params.id}'`, { type: Sequelize.QueryTypes.SELECT })
    //Article.findOne({ _id: req.params.id })
    .then(
      (article) => res.status(200).json({ article }))
    .catch(
      error => res.status(404).json({
        error
      }));
}

exports.findAll = (req, res, next) => {
  Articles.findAll()
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
