const { raw } = require('body-parser');
const { Item: ItemModel, Seller_item: SellerModel } = require('../models');

module.exports = {
  'register': async (req, res) => {
    const { userId, title, price, endTime, description, city } = req.body;
    ItemModel.create({
      title: title,
      price: price,
      photo: req.file.filename,
      description: description,
      endTime: endTime,
      winnerId: null,
      sellerId: userId,
      isClosed: false,
      city: city,
    })
      .then((item) => {
        SellerModel.create({
          UserId: userId,
          ItemId: item.dataValues.id,
        });
      })
      .then(() => {
        res.status(201).json({ 'message': 'ok' });
      }).catch(() => {
        res.status(500).json({ 'message': 'Fail to load data from database' });
      });
  }
};