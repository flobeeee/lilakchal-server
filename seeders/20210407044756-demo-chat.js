'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query('SELECT id FROM Users;');
    const items = await queryInterface.sequelize.query('SELECT id FROM Items;');
    await queryInterface.bulkInsert('Chats', [
      {
        userId: users[0][0].id,
        itemId: items[0][0].id,
        message: '장소는 어디가 편하신가요 ?'
      },
      {
        userId: users[0][1].id,
        itemId: items[0][0].id,
        message: '우체국 앞에서 볼까요 ?'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Chats', null, {});
  }
};
