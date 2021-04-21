'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Seller_items', 'userId', 'UserId');
    await queryInterface.renameColumn('Buyer_items', 'userId', 'UserId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Seller_items', 'UserId', 'userId');
    await queryInterface.renameColumn('Buyer_items', 'UserId', 'userId');
  }
};
