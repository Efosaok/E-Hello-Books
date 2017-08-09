require('dotenv').config()
export default {
  "development": {
    "username": process.env.DB_NAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME_DB,
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_NAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME_TEST_DB,
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  }
}
