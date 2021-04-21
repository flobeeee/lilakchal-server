'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
    }
  }
  Item.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    description: DataTypes.STRING,
    endTime: DataTypes.DATE,
    winnerId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    isClosed: DataTypes.BOOLEAN,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};