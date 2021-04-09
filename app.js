const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const winston = require('./config/winston');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');
const auctionRouter = require('./routes/auction');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(logger('combine', winston.stream));//더 자세한 로그(user-agent, remote-addr, remote-user, version 등)
} else {
  app.use(logger('dev', winston.stream));
}

app.use(express.json());

app.use(cors({
  origin: true,
  Methods: ['POST', 'GET', 'PATCH', 'OPTIONS'],
  credentials: true
}));

app.use(express.static('uploads'));

app.use('/user', userRouter);
app.use('/auction', auctionRouter);
app.use('/:search', searchRouter);

app.get('/', (req, res) => {
  res.send('hello https..');
});

module.exports = app;