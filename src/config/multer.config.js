const path = require('path');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'public', 'images'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    }
})

const config = multer({
    storage: storage,
    dest: path.join(__dirname, 'public', 'images'),
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extName){
            return cb(null, true);
        } else {
            return cb('Error: El archivo debe ser una imágen válida');
        }
    }
}).array('images');

module.exports = config;