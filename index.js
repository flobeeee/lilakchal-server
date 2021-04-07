const server = require('./socket');
const PORT = 4000;

server.listen(PORT, () => {
  console.log(`server listening on ${4000}`);
});
module.exports = server;

// EC2 서버 코드
// key: fs.readFileSync('./privkey.pem', 'utf-8'),
// cert: fs.readFileSync('./cert.pem', 'utf-8'),
// ca: fs.readFileSync('./fullchain.pem', 'utf-8'),