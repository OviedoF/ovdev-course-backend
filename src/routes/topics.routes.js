const express = require('express');
const router = express.Router();
const path = require('path');
const topicsController = require(path.join(__dirname, '..', 'controllers', 'topics.controller'));
const {verifyToken, isAdmin} = require(path.join(__dirname, '..', 'middlewares', 'authRoles'));

router.get('/', topicsController.getTopics);
router.get('/:dirname/:filename', topicsController.getTopicByFilename);

router.post('/', [verifyToken, isAdmin], topicsController.postTopic);
router.put('/:dirname/:filename/editContent', [verifyToken, isAdmin], topicsController.putTopicContent);

router.delete('/:id', topicsController.deleteTopic);
module.exports = router;
