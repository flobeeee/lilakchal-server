const express = require('express');
const auctionController = require('../controllers/auction');
const router = express.Router();
const upload = require('../modules/upload');

router.post('/register', upload.single('file'), auctionController.register);

module.exports = router;