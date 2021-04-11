const sequelize = require('sequelize');
const Op = sequelize.Op;
const { Item: ItemModel } = require('../models');

module.exports = {
  'keyword': async (req, res) => {
    // console.log(req.query); // {keyword: '맥북, city: '서울시 마포구', offset: 1}
    const { keyword, city, offset } = req.query;
    // const { offset } = req.query;

    // 검색어로 아이템 이름 검색
    if (keyword) {
      ItemModel.findAll({
        where: {
          [Op.or]: [{
            title: {
              [Op.like]: '%' + keyword + '%'
            }
          },
          {
            description: {
              [Op.like]: '%' + keyword + '%'
            }
          }]
        }
      })
        .then((result) => {
          if (result.length) {
            const items = result.map((item) => {
              item.dataValues.city = city;
              return item.dataValues;
            });
            const limitItems = items.slice(offset * 5 - 5, offset * 5);
            res.status(200).json({ limitItems });
          } else {
            const items = [];
            res.status(200).json({ items });
          }
        }).catch(() => {
          res.status(500).json({ 'message': 'Fail to load data from database' });
        });
    }
    // 랜딩페이지에서 다음 페이지로 이동하는 순간 지역에 대한 정보가 들어 올 예정
    else {
      ItemModel.findAll()
        .then((result) => {
          if (result.length) {
            const items = result.map((item) => {
              item.dataValues.city = city;
              return item.dataValues;
            });
            res.status(200).json({ items });
          } else {
            const items = [];
            res.status(200).json({ items });
          }
        }).catch(() => {
          res.status(500).json({ 'message': 'Fail to load data from database' });
        });
    }
  }
};