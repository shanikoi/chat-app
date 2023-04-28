const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// registering 
router.post('/register', authController.register);

// logging in
router.post('/login', authController.login);

// logging out 
router.post('/logout', authController.logout);

module.exports = router;
