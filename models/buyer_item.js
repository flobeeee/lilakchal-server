'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buyer_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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