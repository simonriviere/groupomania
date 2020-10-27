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
  console.log(article)
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
  const id = req.params.id;

  Articles.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Articles was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Articles with id=${id}. Maybe Articles was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Articles with id=" + id
      });
    });
};

exports.deleteArticle = (req, res, next) => {
  const id = req.params.id;

  Articles.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id
      });
    });
};

exports.getOneArticle = (req, res, next) => {
 const id = req.params.id;
Articles.findByPk(id)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message: "Error retrieving Tutorial with id=" + id
   });
 });
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
