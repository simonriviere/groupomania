const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/Like')
const auth = require ('../middleware/auth')


//liker sauce
router.post('/:id/like', auth, likeCtrl.createLike);
router.get('/:id/like', auth, likeCtrl.getOneLike);
router.get('/like', auth, likeCtrl.getAllLike);


module.exports = router;