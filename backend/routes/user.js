const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.login);
router.put('/:id', auth, userCtrl.modifyUser);
router.delete('/:id',auth, userCtrl.deleteUser);
router.get('/:id',auth,  userCtrl.getOneUser)
router.get('/', auth, userCtrl.getAllUser);

module.exports = router;