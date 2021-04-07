'use strict';
const {
  Model
} = require('sequelize');

// const user = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(user, { through: 'Buyer_item', foreignKey: 'ItemId', as: 'Item' });
      // this.belongsToMany(user, { through: 'Seller_item', foreignKey: 'ItemId', as: 'Item' });
      // this.belongsToMany(user, { through: 'Chat', foreignKey: 'ItemId', as: 'Item' });
    }
  }
  Item.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    description: DataTypes.STRING,
    endTime: DataTypes.DATE,
    winnerId: DataTypes.INTEGER,
    isClosed: DataTypes.BOOLEAN,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};