const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sf2fmbz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(uri)
    .then(res => console.log('conectado correctamente :D'))
    .catch(error => console.log(error));

module.exports = mongoose;