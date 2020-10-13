const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/article');
const auth = require ('../middleware/auth');

const multer = require('../middleware/multer-config');


//post un article
router.post('/',auth,  multer, stuffCtrl.createArticle)
//modifier un article
router.put('/:id', auth, multer, stuffCtrl.modifyArticle);
//supprimer la route
router.delete('/:id',auth, stuffCtrl.deleteArticle);
//route pour un article en fonction d'orderId
router.get('/:id',auth,  stuffCtrl.getOneArticle)
// route pour tout les articles
router.get('/', auth, stuffCtrl.getAllArticle);

module.exports = router;