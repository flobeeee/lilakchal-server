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
const { Item: ItemModel, Buyer_item: BuyerItemModel, Chat: ChatModel } = require('./models');

//찰나의 차이로 이전 가격을 보고 입찰을 누른 사람을 걸러야함.
//아이템들의 마지막 가격을 해시테이블로 저장하여 중복/더 낮은 가격을 요청하였을 경우를 빠르게 거른다.(캐시데이터 느낌)
const bucket = {
  13: 3000,
  11: 1100,
};

//io.emit(): 소켓에 접속한 사람 모두에게 보낸다.
//socket.emit(): 메시지를 보낸 사람에게만 보낸다.
//socket.broadcast.emit(): 메시지를 보낸 사람을 제외한 나머지에게 보낸다.

//socket.emit('bid', { userId: 0, itemId: 0, price: 888 });

//가격을 Update한다.
const updateItemPrice = async (userId, itemId, price) => {
  await ItemModel.update({winnerId: userId, price: price}, {
    where: {
      id: itemId
    }
  });
};

//입찰정보를 넣는다.
const insertJoinBidData = async (userId, itemId) => {
  return await BuyerItemModel.findOrCreate({ 
    where: {userId, itemId},
    defaults: { 
      UserId: userId,
      ItemId: itemId
    }
  });
};

//채팅을 가져온다.
const getChatMessages = async (roomId) => {
  const messages = await ChatModel.findAll({
    where: {ItemId: roomId}
  });

  return messages.map((message) => ({
    userId: message.UserId,
    itemId: message.ItemId,
    text: message.message,
    createdAt: message.createdAt
  }));
};

const createChatMessage = async (userId, itemId, text) => {
  return await ChatModel.create({
    UserId: userId,
    itemId: itemId,
    message: text
  });
};

const auction = io.of('/auction');
auction.on('connection', (socket) => {
  socket.on('bid', ({userId, itemId, price}) => {
    //console.log(`received: ${userId}, ${itemId}, ${price} from client ${socket.id}`);
    //console.log(bucket, itemId);
    if(bucket[itemId] && bucket[itemId] >= price) {
      socket.emit('refuse', 'fail to bid');
    } else {
      //1. db에 접속하여 낙찰자, 최고가를 변경한다.
      //2. 모든 클라이언트에게 물품과 새로운 최고가를 전달한다.
      updateItemPrice(userId, itemId, price)
        .then(() => {
          insertJoinBidData(userId, itemId);
        })
        .then(() => {
          bucket[itemId] = price; //최고가 데이터 저장
          auction.emit('bid', { userId, itemId, price });
        });
    }
  });
});

const chat = io.of('/chat');
chat.on('connection', (socket) => {
  socket.on('join', ({userId, itemId: roomId}) => {//itemId가 roomid와 동일함
    //console.log(`received_join: ${userId}, ${roomId} from client ${socket.id}`);

    //1. database에서 room의 메시지들을 가져온다.
    getChatMessages(roomId)
      .then((data) => {
        //2. 해당 클라이언트(socket)에게 지금까지의 메시지를 보낸다.
        socket.join(roomId);
        socket.emit('messages', data);
      });
  });

  socket.on('message', ({userId, itemId: room, text}) => {
    //console.log(`received_msg: ${userId}, ${room}, ${text}  from client ${socket.id}`);

    //1. database에 저장하기
    createChatMessage(userId, room, text)
      .then((data) => {
        socket.broadcast.to(room).emit('message', {
          userId: data.UserId,
          createdAt: data.createdAt,
          itemId: data.itemId,
          text: data.message
        }); 
      });
  });
});

  
io.of('/').on('disconnect', () => { console.log('disconnect!'); });


module.exports = server;