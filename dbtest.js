const { User: USERModel, Item: ITEMModel, Chat: CHATModel } = require('./models');
// const { Buyer_item: BUYERModel, Seller_item: SELLERModel,  } = require('./models');

// 유저테이블에서 정보찾기
USERModel.findOne({
  where: {
    kakaoid: 'user1@kakao.com'
  }
})
  .then((result) => {
    console.log(result.dataValues);
  });

// 유저가 판매하는 상품 타이틀찾기
USERModel.findAll({
  where: {
    kakaoid: 'user1@kakao.com',
  },
  include: [
    {
      model: ITEMModel,
      required: true,
      attributes: ['title'],
      as: 'Item',
      through: {
        attributes: ['UserId', 'ItemId']
      }
    }
  ]
})
  .then((result) => {
    console.log(result[0].Item);
  });

// 유저가 입찰한 상품 타이틀 찾기
USERModel.findAll({
  where: {
    kakaoid: 'user2@kakao.com',
  },
  include: [
    {
      model: ITEMModel,
      required: true,
      attributes: ['title'],
      as: 'ItemB',
      through: {
        attributes: ['UserId', 'ItemId']
      }
    }
  ]
})
  .then((result) => {
    console.log(result[0].dataValues.ItemB);
  });

// 낙찰된 아이템 채팅내역
ITEMModel.findAll({
  where: {
    id: 1,
  },
  include: [
    {
      model: CHATModel,
      required: true,
      attributes: ['message', 'userId'],
    }
  ]
})
  .then((result) => {
    console.log(result[0].dataValues.Chats);
  });