const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create new User
router.post('/', userController.createUser);

// Read all users
router.get('/', userController.getAllUsers);

// Read a User by ID
router.get('/:id', userController.getUserById);

// Delete a User by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
