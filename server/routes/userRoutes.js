const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// creating user
router.post('/', userController.createUser);

// updating user profile
router.put('/:userId', userController.updateUser);

// deleting user
router.delete('/:userId', userController.deleteUser);

module.exports = router;
