'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Chats', 'userId', 'UserId');
    await queryInterface.renameColumn('Chats', 'itemId', 'ItemId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Chats', 'UserId', 'userId');
    await queryInterface.renameColumn('Chats', 'ItemId', 'itemId');
  }
};