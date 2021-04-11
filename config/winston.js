const fs = require('fs');
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = 'logs';  // logs 디렉토리 하위에 로그 파일 저장

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  transports: [
    new winstonDaily({// error 레벨 로그를 저장할 파일 설정
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
      filename: '%DATE%.error.log',
      maxFiles: 50,
      zippedArchive: true,
    }),
    // new winstonDaily({// error 레벨 로그를 저장할 파일 설정
    //   level: 'info',
    //   datePattern: 'YYYY-MM-DD',
    //   dirname: logDir + '/info',  // error.log 파일은 /logs/error 하위에 저장 
    //   filename: '%DATE%.info.log',
    //   maxFiles: 50,
    //   zippedArchive: true,
    // }),
  ],
});

logger.stream = {
  write: message => {
    logger.info(message);
  }
};

module.exports = logger;