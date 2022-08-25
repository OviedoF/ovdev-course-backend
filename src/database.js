const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://localhost/ovdev-course`)
    .then(res => console.log('conectado correctamente :D'))
    .catch(error => console.log(error));

module.exports = mongoose;