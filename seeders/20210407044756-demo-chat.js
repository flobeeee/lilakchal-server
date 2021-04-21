'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query('SELECT id FROM Users;');
    const items = await queryInterface.sequelize.query('SELECT id FROM Items;');
    await queryInterface.bulkInsert('Chats', [
      {
        userId: users[0][0].id,
        itemId: items[0][0].id,
        message: '장소는 어디가 편하신가요 ?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][1].id,
        itemId: items[0][0].id,
        message: '우체국 앞에서 볼까요 ?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][1].id,
        itemId: items[0][1].id,
        message: '시간 언제가 좋으세요?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][2].id,
        itemId: items[0][1].id,
        message: '이번주 주말 괜찮으신가요 ?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][2].id,
        itemId: items[0][2].id,
        message: '안녕하세요~~',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][3].id,
        itemId: items[0][2].id,
        message: '네 안녕하세여 ㅎㅎ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][3].id,
        itemId: items[0][3].id,
        message: '택배로 배송해도 될까요?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][0].id,
        itemId: items[0][3].id,
        message: '저는 직거래가 편한데 ..',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Chats', null, {});
  }
};
