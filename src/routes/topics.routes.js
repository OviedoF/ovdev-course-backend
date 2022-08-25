const express = require('express');
const router = express.Router();
const path = require('path');
const topicsController = require(path.join(__dirname, '..', 'controllers', 'topics.controller'));

router.get('/', topicsController.getTopics);
router.get('/:dirname/:filename', topicsController.getTopicByFilename);

router.post('/', topicsController.postTopic);

router.put('/:dirname/:filename/editContent', topicsController.putTopicContent);
module.exports = router;
