'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      endTime: {
        type: Sequelize.DATE
      },
      winnerId: {
        type: Sequelize.INTEGER
      },
      isClosed: {
        type: Sequelize.BOOLEAN
      },
      city: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Items');
  }
};