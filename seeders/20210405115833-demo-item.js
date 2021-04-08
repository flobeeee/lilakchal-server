'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      {
        title: '바나나우유 기프티콘',
        price: 800,
        photo: 'banana.png',
        description: '선물받았는데 주변에 gs가 없어서 팔아요',
        endTime: '2021-04-07 12:11:09',
        winnerId: 2,
        isClosed: true,
        city: '서울시 마포구',
      },
      {
        title: '치킨 기프티콘',
        price: 15000,
        photo: 'bhc.png',
        description: '주로 비비큐 먹는데, 선물로 받아서 팔아요',
        endTime: '2021-04-09 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 마포구',
      },
      {
        title: '햄버거 기프티콘',
        price: 10000,
        photo: 'burger.png',
        description: '선물용으로 좋아요',
        endTime: '2021-04-11 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 마포구',
      },
      {
        title: '스타벅스 기프티콘',
        price: 12000,
        photo: 'starbucks.png',
        description: '급전 필요해서 선물받았던거 팝니다.',
        endTime: '2021-04-13 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 마포구',
      },
      {
        title: '투썸 기프티콘',
        price: 15000,
        photo: 'twosome.png',
        description: '카페 같이갈 사람이 없네요 ㅠㅠ ',
        endTime: '2021-04-15 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 마포구',
      },
      {
        title: '애플 iMac',
        price: 2500000,
        photo: 'banana.png',
        description: '공홈에서 312만원하는 녀석입니다. 이미 쓰고있는 게 있어서 팔아요 새상품입니다 ^^ ',
        endTime: '2021-04-17 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 성동구',
      },
      {
        title: '애플 iPad Air 그린',
        price: 550000,
        photo: 'ipad.png',
        description: '말이 필요한가요 ? 색 잘빠졌습니다. 64기가. 1년정도 사용했습니다.',
        endTime: '2021-04-19 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 성동구',
      },
      {
        title: '애플 매직키보드',
        price: 70000,
        photo: 'keyboard.png',
        description: '1년전에 선물받았는데, 손이안가서 쌓아두다가 팝니다',
        endTime: '2021-04-21 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 성동구',
      },
      {
        title: '애플 맥북 에어 M1 미개봉 (13인치 스페이스그레이)',
        price: 1000000,
        photo: 'macbook.png',
        description: '256기가 미개봉제품입니다. 박스도 안뜯었습니다. 시청 앞에서 직거래 선호합니다.',
        endTime: '2021-04-23 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 성동구',
      },
      {
        title: '애플 매직마우스 1세대 팝니다',
        price: 20000,
        photo: 'mouse.png',
        description: '사용감 있지만 작동 잘 됩니다.',
        endTime: '2021-04-25 12:11:09',
        winnerId: null,
        isClosed: false,
        city: '서울시 성동구',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};