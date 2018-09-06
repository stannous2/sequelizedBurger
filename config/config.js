module.exports = {
  "development": {
    "username": 'root',
    "password": 'Asdf1234!',
    "database": "burgers_db",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
<<<<<<< HEAD
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_KEY,
    "database": process.env.MYSQL_DBNAME,
    "host": process.env.MYSQL_HOST,
=======
    "username": "root",
    "password": "Asdf1234!",
    "database": "burgers_db",
    "host": "127.0.0.1",
>>>>>>> 33d9b84bb531168587baf93eae3068eb3562c94d
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
