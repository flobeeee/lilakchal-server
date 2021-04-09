const express = require('express');
const auctionController = require('../controllers/auction');
const router = express.Router();
const multer = require('multer');

const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/register', upload.single('file'), auctionController.register);

module.exports = router;