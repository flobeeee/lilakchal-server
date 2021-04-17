require('dotenv').config();
const axios = require('axios');
// const qs = require('qs');
const { User: UserModel, Item: ItemModel } = require('../models');
// const clientID = process.env.KAKAO_CLIENT_ID;
// const clientSecret = process.env.KAKAO_CLIENT_SECRET;
// const redirectURL = process.env.KAKAO_REDIRECT_URL;

module.exports = {
  // 카카오 오어스 로그인, 강제회원가입
  'oauth': async (req, res) => {
    const accessToken = req.body.access_token;
    console.log('2. 토큰받음', req.body.access_token);
    axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((data) => {
        // console.log('3. 유저정보받음', data.data);
        const kakaoid = data.data.id;
        const name = data.data.properties.nickname;
        UserModel
          .findOrCreate({
            where: {
              kakaoid: `${kakaoid}@kakao.com`,
            },
            defaults: {
              name: name,
            },
          }).then((user) => {
            // console.log('4. 회원가입', user);
            const { name, id } = user[0].dataValues;
            res.set('Set-Cookie', [`accessToken=${accessToken}`]);
            // res.cookie('id', userInfo.id, {
            //   domain: 'localhost',
            //   path: '/',
            //   sameSite: 'none',
            //   httpOnly: true,
            //   secure: true,
            // });
            res.status(200).json({ name, id });
          });
      }).catch(e => {
        console.log('에러', e);
        res.status(500).json({ 'message': 'Fail to login' });
      });
  },
  // 닉네임 변경
  'name': async (req, res) => {
    const { userId, name } = req.body;
    await UserModel.update({ name: name }, {
      where: {
        id: userId
      }
    })
      .then(() => {
        res.status(200).json({ 'message': 'ok' });
      }).catch(() => {
        res.status(500).json({ 'message': 'Fail to update name' });
      });
  },

  // 입찰에 참여한 물품 조회
  'getBuyerItems': async (req, res) => {
    const { userId, offset, city } = req.body;
    await UserModel.findAll({
      where: {
        id: userId,
      },
      include: [
        {
          model: ItemModel,
          required: true,
          as: 'ItemB',
          through: {
            attributes: ['UserId', 'ItemId']
          }
        }
      ],
      limit: 6,
      offset: Number(offset) || 0,
      subQuery: false
    })
      .then((result) => {
        if (result.length) {
          const items = result[0].dataValues.ItemB.map((item) => {
            item.dataValues.city = city;
            return item.dataValues;
          });
          res.status(200).json({ items });
        } else {
          const items = [];
          res.status(200).json({ items });
        }
      }).catch(() => {
        res.status(500).json({ 'message': 'Fail to load data from database' });
      });
  },

  // 경매에 내놓은 물품 조회
  'getSellerItems': async (req, res) => {
    const { userId, offset, city } = req.body;
    await UserModel.findAll({
      where: {
        id: userId,
      },
      include: [
        {
          model: ItemModel,
          required: true,
          as: 'Item',
          through: {
            attributes: ['UserId', 'ItemId']
          }
        }
      ],
      offset: Number(offset) || 0,
      limit: 6,
      subQuery: false
    })
      .then((result) => {
        if (result.length) {
          const items = result[0].dataValues.Item.map((item) => {
            item.dataValues.city = city;
            return item.dataValues;
          });
          res.status(200).json({ items });
        } else {
          const items = [];
          res.status(200).json({ items });
        }
      }).catch(() => {
        res.status(500).json({ 'message': 'Fail to load data from database' });
      });
  },
};