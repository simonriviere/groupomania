const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');//pour la gestion des fichiers envoyé par l'utilisateur
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('groupomania', 'root', 'Sisi1992!', {
  host: 'localhost',
  dialect: 'mysql',

});
try {
  sequelize.authenticate();
  console.log('Connecté a la bdd mysql')
} catch (error) {
  console.log('Pas connecté, error');
}
const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
const Article = require('./models/article')(sequelize, DataTypes);


// gérer les erreurs CROS, ajout de middleware qui s'appliquera à toute les routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre api depuis n'importe quelle origine '*'
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajout des headers mentionnés aux requetes envoyées vers notre api'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoyer les requêtes avec les méthodes get post ...
  next();
});

app.post('/api/Articles', (req, res, next) => {

  const createArticle = req.body
  delete createArticle._id;
  // l'id est fournis automatiquement du coup on ne récupère pas celui du front 
  const article = new Article({
    ...createArticle,
  })
  console.log(article)
  sequelize.query(`INSERT INTO Articles (titre, commentaire, image) VALUES('${article.titre}','${article.commentaire}','${article.image}' ) `)
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/Articles/:id', (req, res, next) => {
  sequelize.query(`UPDATE Articles SET titre='${article.titre}',commentaire='${article.commentaire}',image='${article.image}' WHERE id= '${req.params.id}'`)
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});
app.delete('/api/Articles/:id', (req, res, next) => {

  sequelize.query(`DELETE FROM Articles WHERE id ='${req.params.id}' `)
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});
app.get('/api/Articles/:id', ((req, res, next) => {
  console.log(req.params.id)
  sequelize.query(`SELECT * FROM Articles WHERE id ='${req.params.id}'`)
    //Article.findOne({ _id: req.params.id })
    .then(
      (article) => res.status(200).json(article))
    .catch(
      error => res.status(404).json({
        error
      }));
}))

app.get('/api/Articles', (req, res, next) => {
  sequelize.query("SELECT * FROM Articles")
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({ error }));
});





module.exports = app;



