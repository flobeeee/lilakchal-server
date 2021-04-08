const express = require('express');
const userController = require('../controllers/user');
const myAuctionRouter = require('./myauction');
const router = express.Router();

router.post('/oauth', userController.oauth);
router.get('/logout', userController.logout);
router.patch('/name', userController.name);

router.use('/myauction', myAuctionRouter);

module.exports = router;