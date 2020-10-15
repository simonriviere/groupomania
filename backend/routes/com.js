const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/Com');
const auth = require ('../middleware/auth');

const multer = require('../middleware/multer-config');



router.post('/',auth,  multer, stuffCtrl.createCom)
router.put('/:id', auth, multer, stuffCtrl.modifyCom);
router.delete('/:id',auth, stuffCtrl.deleteCom);
router.get('/:id',auth,  stuffCtrl.getOneCom);
router.get('/', auth, stuffCtrl.getAllCom);

module.exports = router;