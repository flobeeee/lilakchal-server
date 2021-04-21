'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller_item extends Model {
    static associate(models) {
    }
  }
  Seller_item.init({

  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Seller_item',
  });
  return Seller_item;
};