const { User: USERModel, Item: ITEMModel } = require('./models');
// const { Buyer_item: BUYERModel, Seller_item: SELLERModel, Chat: CHATModel } = require('./models');

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

// LISTModel.findAll({
//   where: {
//     id: 1
//   },
//   include: [{
//     model: SONGModel,
//     required: true,
//     attributes: ['songNum', 'title'],
//     through: {
//       attributes: ['ListId', 'SongId']
//     }
//   }]
// })
//   .then((result) => {
//     //console.log(result[0].Songs);
//   });