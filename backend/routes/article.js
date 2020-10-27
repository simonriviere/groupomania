module.exports = app => {
    var router = require("express").Router();
    const articles = require("../controllers/article.js");


    const auth = require('../middleware/auth');
    const multer = require('../middleware/multer-config');


    //post un article
    router.post('/', auth, multer,articles.createArticle)
    //modifier un article
    router.put('/:id', auth, multer,articles.modifyArticle);
    //supprimer la route
    router.delete('/:id', auth,articles.deleteArticle);
    //route pour un article en fonction d'orderId
    router.get('/:id', auth,articles.getOneArticle)
    // route pour tout les articles
    router.get('/', auth, articles.findAll);

   app.use('/api/articles', router)
}