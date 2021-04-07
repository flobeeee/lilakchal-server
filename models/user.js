'use strict';
const {
  Model
} = require('sequelize');

// const item = require('./item');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(item, { through: 'Buyer_item', foreignKey: 'UserId', as: 'User' });
      // this.belongsToMany(item, { through: 'Seller_item', foreignKey: 'UserId', as: 'User' });
      // this.belongsToMany(item, { through: 'Chat', foreignKey: 'UserId', as: 'User' });
    }
  }
  User.init({
    kakaoid: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};