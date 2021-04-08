require('dotenv').config();
const axios = require('axios');
const { User: UserModel } = require('../models');
const clientID = process.env.KAKAO_CLIENT_ID;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;
const redirectURL = process.env.KAKAO_REDIRECT_URL;

module.exports = {
  'oauth': async (req, res) => {
    // console.log(req.body.authorizationCode); // 코드 들어옴

    axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        grant_type: 'authorization_code',
        client_id: clientID,
        redirect_uri: redirectURL,
        code: req.body.authorizationCode,
        client_secret: clientSecret,
      }
    }).then((response) => {
      const accessToken = response.data.access_token;
      axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
        .then((data) => {
          const kakaoid = data.email;
          const name = data.kakao_account.profile.nickname;
          UserModel
            .findOrCreate({
              where: {
                kakaoid: kakaoid,
              },
              defaults: {
                name: name,
              },
            });
        })
        .then((user) => {
          const { kakaoId, name, id } = user[0].dataValues;
          res.set('Set-Cookie', [`accessToken=${accessToken}`]);
          res.status(200).json({ kakaoId, name, id });
        });
    }).catch(e => {
      res.status(500).json({ 'message': 'Fail to login' });
    });
  },
  'name': async (req, res) => {
    console.log('name', req.body);
  },
  'getBuyerItems': async (req, res) => {
    console.log('myauctionBuyer', req.body);
  },
  'getSellerItems': async (req, res) => {
    console.log('myauctionSeller', req.body);
  },
};