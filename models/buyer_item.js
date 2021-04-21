'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buyer_item extends Model {
    static associate(models) {
    }
  }
  Buyer_item.init({

  }, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Buyer_item',
  });
  return Buyer_item;
};