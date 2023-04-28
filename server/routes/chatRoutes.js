const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// getting all user contacts
router.get('/contacts', chatController.getContacts);

// getting all the messages between two users
router.get('/messages/:userId', chatController.getMessages);

// sending message
router.post('/messages/:userId', chatController.sendMessage);

module.exports = router;
