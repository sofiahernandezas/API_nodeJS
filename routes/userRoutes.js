const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users/:id', userController.getUserById);

router.put('/users/:id', userController.updateUser);

module.exports = router;
