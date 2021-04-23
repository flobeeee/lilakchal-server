const dotenv = require('dotenv');
dotenv.config();

const config = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "ttmk_dev",
    "host": process.env.DATABASE_HOST,
    "dialect": "mysql",
    "timezone": "+09:00",
    "port": process.env.DATABASE_PORT
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "ttmk_test",
    "host": process.env.DATABASE_HOST,
    "dialect": "mysql",
    "timezone": "+09:00",
    "port": process.env.DATABASE_PORT
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "ttmk",
    "host": process.env.DATABASE_HOST,
    "dialect": "mysql",
    "timezone": "+09:00",
    "port": process.env.DATABASE_PORT
  }
}

module.exports = config;