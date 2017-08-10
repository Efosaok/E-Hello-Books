"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();
exports.default = {

  "development": {
    "username": process.env.DB_NAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME_DB,
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
};