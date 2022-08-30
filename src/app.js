const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const createInitialRoles = require(path.join(__dirname, 'libs', 'initialRoles'));
const createInitialUser = require(path.join(__dirname, 'libs', 'initialAdmin'));

// initializes
require('dotenv').config();
require(path.join(__dirname, 'database'));

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(require(path.join(__dirname, 'config', 'multer.config')));

// setting
app.use(cors({
    origin: '*'
}));
createInitialRoles();
createInitialUser();

// routes
app.use('/', require(path.join(__dirname, 'routes', 'index.routes')));
app.use('/api/courses', require(path.join(__dirname, 'routes', 'courses.routes')));
app.use('/api/topics', require(path.join(__dirname, 'routes', 'topics.routes')));
app.use('/api/auth', require(path.join(__dirname, 'routes', 'auth.routes')));
app.use('/api/user', require(path.join(__dirname, 'routes', 'user.routes')));

module.exports = app;