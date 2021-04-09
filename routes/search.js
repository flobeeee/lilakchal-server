const express = require('express');
const searchController = require('../controllers/search');
const router = express.Router();

router.get('', searchController.keyword);

module.exports = router;