const express = require('express');
const router = express.Router();
const path = require('path');
const coursesController = require(path.join(__dirname, '..', 'controllers', 'courses.controller'));
const {verifyToken, isAdmin} = require(path.join(__dirname, '..', 'middlewares', 'authRoles'));

router.get('/', coursesController.getCourses);
router.get('/:dirname', coursesController.getCourseByDirname);

router.post('/', [verifyToken, isAdmin], coursesController.postCourse);

router.delete('/id/:id', [verifyToken, isAdmin], coursesController.deleteCourse);

module.exports = router;
