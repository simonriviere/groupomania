const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); //pour la gestion des fichiers envoyé par l'utilisateur
const userRoutes = require('./routes/user');
const articleRoutes= require('./routes/article')
const app = express();
app.use(bodyParser.json());
// gérer les erreurs CROS, ajout de middleware qui s'appliquera à toute les routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre api depuis n'importe quelle origine '*'
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajout des headers mentionnés aux requetes envoyées vers notre api'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoyer les requêtes avec les méthodes get post ...
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/articles', articleRoutes)
app.use('/api/auth', userRoutes);



module.exports = app;



