const express = require('express');
const router = express.Router();
const storyController = require('../controllers/story.controller');

router.get('/create', storyController.generateStory);

module.exports = router; 