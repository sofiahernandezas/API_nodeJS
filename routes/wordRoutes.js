const express = require('express');
const WordController = require('../controllers/wordController');

const router = express.Router();

router.get('/word', WordController.getRandomWord);

module.exports = router;
