const { Item: ItemModel, Seller_item: SellerModel } = require('../models');

module.exports = {
  'register': async (req, res) => {
    // console.log('------------------------------');
    // console.log(req.body);
    // console.log(req.file);
    // console.log('------------------------------');
    const { userId, title, price, endTime, description, photo, city } = req.body;
    ItemModel.create({
      title: title,
      price: price,
      photo: photo,
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