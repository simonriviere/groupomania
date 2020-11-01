const multerProfile = require('multer');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif':'gif'
};

const storage = multerProfile.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'imagesProfile');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multerProfile({ storage: storage }).single('imageProfil');