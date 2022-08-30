const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require(path.join(__dirname, '..', 'controllers', 'user.controller'));
const verifySignUp = require(path.join(__dirname, '..', 'middlewares', 'verifySignUp'));

router.post('/:id/addCourse', userController.addCourseInProcess);

router.get('/:id/getCoursesInProcess', userController.getCoursesInProcess)

module.exports = router;
