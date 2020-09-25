const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path') //pour la gestion des fichiers envoyé par l'utilisateur
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce'); 
const helmet = require('helmet');//protège les vulnérabilité d'en tête HTPP
const filter = require('content-filter')



mongoose.connect('mongodb+srv://simon:mdpPourLeP6@cluster0.76ulj.mongodb.net/piquant?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(helmet()); 
// gérer les erreurs CROS, ajout de middleware qui s'appliquera à toute les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre api depuis n'importe quelle origine '*'
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajout des headers mentionnés aux requetes envoyées vers notre api'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoyer les requêtes avec les méthodes get post ...
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//affiche les images sans le path
app.use('/images', express.static(path.join(__dirname, 'images')));

//gestion des caractères interdit pour prévenir les attaques par injection
var blackList = ['$','{','&&','||']
var options = {
    urlBlackList: blackList,
    bodyBlackList: blackList
}
app.use(filter(options));

app.use('/api/sauces', saucesRoutes)
app.use ('/api/auth', userRoutes);

module.exports = app;






