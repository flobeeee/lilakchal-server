'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        kakaoid: 'user1@kakao.com',
        name: '기프티콘업자아님',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kakaoid: 'user2@kakao.com',
        name: '갤럭시조아',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
