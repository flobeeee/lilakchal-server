//database query 추후 추가
module.exports = {
  'oauth': async (req, res) => {
    console.log('oauth', req.body);
  },
  'logout': async (req, res) => {
    console.log('logout', req.body);
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