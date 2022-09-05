const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require(path.join(__dirname, '..', 'controllers', 'user.controller'));
const verifySignUp = require(path.join(__dirname, '..', 'middlewares', 'verifySignUp'));

router.post('/:id/addCourse', userController.addCourseInProcess);

router.get('/:id/getCoursesInProcess', userController.getCoursesInProcess);

router.post('/:id/handlefav/:topicId', userController.handleFavorite);

router.get('/:id/getfavs', userController.getFavs);

router.get('/:id/getfavs/complete', userController.getCompleteFavs);

module.exports = router;
