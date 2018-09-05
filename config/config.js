module.exports = {
  "development": {
    "username": 'root',
    "password": 'Asdf1234!',
    "database": "burgers_db",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "Asdf1234!",
    "database": "burgers_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
