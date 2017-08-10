
export default {
  "development": {
    "username": "DB_NAME",
    "password": "DB_PASS",
    "database": "DB_NAME_DB",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  },

}
