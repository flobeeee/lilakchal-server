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

//찰나의 차이로 이전 가격을 보고 입찰을 누른 사람을 걸러야함.
//아이템들의 마지막 가격을 해시테이블로 저장하여 중복/더 낮은 가격을 요청하였을 경우를 빠르게 거른다.(캐시데이터 느낌)
const bucket = {
  13: 3000,
  11: 1100,
};

const messges = [
  { 'userId': 1,
    'itemId': 1,
    'message': '안녕하세요..!' },
  { 'userId': 2,
    'itemId': 1,
    'message': '네넹 거래 하실건가요?' },
  { 'userId': 1,
    'itemId': 1,
    'message': '당연하죠' },
];

//io.emit(): 소켓에 접속한 사람 모두에게 보낸다.
//socket.emit(): 메시지를 보낸 사람에게만 보낸다.
//socket.broadcast.emit(): 메시지를 보낸 사람을 제외한 나머지에게 보낸다.

io.on('connection', function(socket) {

  const auction = io.of('/auction');
  auction.on('connection', (socket) => {
    socket.on('bid', ({userId, itemId, price}) => {
      console.log(`received: ${userId}, ${itemId}, ${price} from client ${socket.id}`);
      if(bucket[itemId] && bucket[itemId] > price) {
        socket.emit('refuse', 'fail to bid');
      } else {
        //1. db에 접속하여 낙찰자, 최고가를 변경한다.
        //2. 모든 클라이언트에게 물품과 새로운 최고가를 전달한다.
        bucket[itemId] = price; //최고가 데이터 저장
        io.emit('bid', { userId, itemId, price });
      }
    });
  });

  const chat = io.of('/chat');
  chat.on('connection', (socket) => {
    socket.on('join', ({userId, itemId: room}) => {//itemId가 roomid와 동일함
      console.log(`received: ${userId}, ${room} from client ${socket.id}`);

      //1. database에서 room의 메시지들을 가져온다.
      //2. 해당 클라이언트(socket)에게 지금까지의 메시지를 보낸다.
      socket.join(room);
      socket.to(room).emit('messages', messges); //DB있다면 지금까지의 메시지 객체로 전달하는 것으로 변경
    });

    socket.on('message', ({userId, itemId: room, msg}) => {
      console.log(`received: ${userId}, ${room} from client ${socket.id}`);

      //1. database에 저장하기
      //2. join되어있는 모든 사람(본인포함)에게 메시지를 전송: 나한테선 보낸 메시지인데 상대가 볼때는 메시지가 안 온 것이 보낸 사람의 렌더속도보다 더 심한 문제라 판단됨
      //join 이벤트에서 이미 join되어 있으므로 message에서 join을 할 필요가 없는 것인지 추후 확인
      chat.to(room).emit('message', msg); 
    });
  });

  
  socket.on('disconnect', () => { console.log('disconnect!'); });
});

module.exports = server;