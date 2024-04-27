const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat');
const userAuthentication = require('../middlewares/auth');


router.post('/send-message', userAuthentication.isAuthenticated, chatController.sendMessage);

router.get('/fetch-messages', userAuthentication.isAuthenticated, chatController.fetchMessages);

module.exports = router;