const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/buyer', userController.getBuyerItems);
router.post('/seller', userController.getSellerItems);

module.exports = router;