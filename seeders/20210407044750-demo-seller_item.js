'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query('SELECT id FROM Users;');
    const items = await queryInterface.sequelize.query('SELECT id FROM Items;');
    const joinTable = () => {
      const result = [];
      for (let i = 0; i < 24; i = i + 4) {
        result.push({ userId: users[0][0].id, itemId: items[0][i].id });
        result.push({ userId: users[0][1].id, itemId: items[0][i + 1].id });
        result.push({ userId: users[0][2].id, itemId: items[0][i + 2].id });
        result.push({ userId: users[0][3].id, itemId: items[0][i + 3].id });
      }
      return result;
    };
    const join = joinTable();

    await queryInterface.bulkInsert('Seller_items', join);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Seller_items', null, {});
  }
};
