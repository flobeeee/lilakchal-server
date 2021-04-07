'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { User, Item, Buyer_item, Seller_item, Chat } = sequelize.models;

Chat.belongsTo(User);
User.hasMany(Chat);

Chat.belongsTo(Item);
Item.hasMany(Chat);

User.belongsToMany(Item, { through: 'Seller_item', foreignKey: 'UserId', as: 'Item' });
User.belongsToMany(Item, { through: 'Buyer_item', foreignKey: 'UserId', as: 'ItemB' });
// User.belongsToMany(Item, { through: 'Chat', foreignKey: 'UserId', as: 'ItemC' });

Item.belongsToMany(User, { through: 'Seller_item', foreignKey: 'ItemId', as: 'User' });
Item.belongsToMany(User, { through: 'Buyer_item', foreignKey: 'ItemId', as: 'UserB' });
// Item.belongsToMany(User, { through: 'Chat', foreignKey: 'ItemId', as: 'UserC' });

Buyer_item.belongsTo(User, {
  foreignKey: 'UserId',
  as: 'UserB'
});

Buyer_item.belongsTo(Item, {
  foreignKey: 'ItemId',
  as: 'ItemB'
});

Seller_item.belongsTo(User, {
  foreignKey: 'UserId',
  as: 'User'
});

Seller_item.belongsTo(Item, {
  foreignKey: 'ItemId',
  as: 'Item'
});

// Chat.belongsTo(User, {
//   foreignKey: 'UserId',
//   as: 'UserC'
// });

// Chat.belongsTo(Item, {
//   foreignKey: 'ItemId',
//   as: 'ItemC'
// });

module.exports = db;
