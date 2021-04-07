const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
  origin: true,
  Methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('hello https');
});

module.exports = app;