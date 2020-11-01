
module.exports = app => {

    const userCtrl = require('../controllers/user'); 
    var router = require("express").Router();
    const auth = require('../middleware/auth');
const multerProfile = require('../middleware/multerProfile-config');

    router.post('/signup', userCtrl.signup);
    router.post('/signin', userCtrl.login);
    router.put('/:id', auth, multerProfile, userCtrl.modifyUser);
    router.delete('/:id',auth, userCtrl.deleteUser);
    router.get('/:id',auth,  userCtrl.getOneUser)
    router.get('/', auth, userCtrl.getAllUser);

   app.use('/api/auth', router)
}