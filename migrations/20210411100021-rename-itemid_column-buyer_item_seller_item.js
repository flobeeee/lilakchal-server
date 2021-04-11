'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Seller_items', 'itemId', 'ItemId');
    await queryInterface.renameColumn('Buyer_items', 'itemId', 'ItemId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Seller_items', 'ItemId', 'itemId');
    await queryInterface.renameColumn('Buyer_items', 'ItemId', 'itemId');
  }
};
