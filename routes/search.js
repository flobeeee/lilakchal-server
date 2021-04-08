const express = require('express');
const searchController = require('../controllers/search');
const router = express.Router();

router.get('/keyword', searchController.keyword);
router.get('/area', searchController.area);

module.exports = router;