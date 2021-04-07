const https = require('https');
const SocketIO = require('socket.io');
const fs = require('fs');
const app = require('./app.js');
const server = https
  .createServer(
    {
      key: fs.readFileSync('./key.pem', 'utf-8'),
      cert: fs.readFileSync('./cert.pem', 'utf-8'),
    }
    , app
  );
const io = SocketIO(server);

let member = 0;

io.on('connection', function(socket) {

  //연결된 클라이언트에게 현재 멤버수 전달
  socket.emit('member', `${member} 명`);

  socket.on('join', (data) => {
    console.log('received: "' + data + '" from client' + socket.id);
    member++;
    io.emit('join', `${member} 명`);
  });

  socket.on('leave', (data) => {
    console.log('received: "' + data + '" from client' + socket.id);
    member--;
    io.emit('leave', `${member} 명`);
  });

  socket.on('disconnect', () => {
    console.log('disconnected from ', socket.id);
  });
  socket.on('disconnect', () => { console.log('disconnect!'); });
});

module.exports = server;