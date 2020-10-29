const db = require("../models/");
const Commentaires = db.commentaires;
const Op = db.Sequelize.Op;


exports.createCom = (req, res, next) => {
  const commentaire = {
    message: req.body.message,
    articleId : req.body.articleId,
    userId: req.body.userId,
  };
  console.log(commentaire)
  Commentaires.create(commentaire)
    .then(commentaire => {
      res.send(commentaire);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.modifyCom = (req, res, next) => {
  const id = req.params.id;

  Commentaires.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Commentaires was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Commentaires with id=${id}. Maybe Commentaires was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Commentaires with id=" + id
      });
    });
};

exports.deleteCom = (req, res, next) => {
  const id = req.params.id;

  Commentaires.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Commentaire was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Commentaire with id=${id}. Maybe Commentaire was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Commentaire with id=" + id
      });
    });
};

exports.getOneCom = (req, res, next) => {
 const id = req.params.id;
Commentaires.findByPk(id)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message: "Error retrieving Tutorial with id=" + id
   });
 });
}

exports.getAllCom = (req, res, next) => {
  Commentaires.findAll()
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