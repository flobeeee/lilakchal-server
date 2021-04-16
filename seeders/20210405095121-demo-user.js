'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        kakaoid: '1692445585@kakao.com',
        name: '못마땅',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kakaoid: '1691485170@kakao.com',
        name: '사과따땅',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kakaoid: '1691737388@kakao.com',
        name: '얼렁뚱땅땅',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kakaoid: '1691352301@kakao.com',
        name: '피땅눈물',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
