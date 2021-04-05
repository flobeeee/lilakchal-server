const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(cors({
  origin: true,
  Methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('hello https');
});

const server = https
  .createServer(
    {
      key: fs.readFileSync('./key.pem', 'utf-8'),
      cert: fs.readFileSync('./cert.pem', 'utf-8'),
    }
    , app
  ).listen(PORT);
module.exports = server;

// EC2 서버 코드
// key: fs.readFileSync('./privkey.pem', 'utf-8'),
// cert: fs.readFileSync('./cert.pem', 'utf-8'),
// ca: fs.readFileSync('./fullchain.pem', 'utf-8'),