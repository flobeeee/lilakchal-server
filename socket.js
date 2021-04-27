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

//가격을 Update한다.
const updateItemPrice = async (userId, itemId, price) => {
  await ItemModel.update({ winnerId: userId, price: price }, {
    where: {
      id: itemId
    }
  });
};

//입찰정보를 넣는다.
const insertJoinBidData = async (userId, itemId) => {
  return await BuyerItemModel.findOrCreate({
    where: { userId, itemId },
    defaults: {
      UserId: userId,
      ItemId: itemId
    }
  });
};

//채팅을 가져온다.
const getChatMessages = async (roomId) => {
  const messages = await ChatModel.findAll({
    where: { ItemId: roomId }
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

const bucket = {};
const auction = io.of('/auction');
auction.on('connection', (socket) => {
  socket.on('bid', ({ userId, itemId, price }) => {
    if (bucket[itemId] && bucket[itemId] >= price) {
      socket.emit('refuse', 'fail to bid');
    } else {
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
  socket.on('join', ({ userId, itemId: roomId }) => {
    getChatMessages(roomId)
      .then((data) => {
        socket.join(roomId);
        socket.emit('messages', data);
      });
  });

  socket.on('message', ({ userId, itemId: room, text }) => {
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

module.exports = server;