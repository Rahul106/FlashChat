const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat');


router.post('/send-message/:recId', chatController.sendMessage);

router.get('/fetch-messages/:receiverId', chatController.fetchMessages);

router.get('/recent-message/:recMsgId', chatController.recentMessage);



module.exports = router;