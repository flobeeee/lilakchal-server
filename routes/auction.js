const express = require('express');
const auctionController = require('../controllers/auction');
const router = express.Router();

router.post('/register', auctionController.register);

module.exports = router;