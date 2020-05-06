function executarDB() {
  
var Sequelize = require('sequelize');
  
var connection = new Sequelize('127.0.0.1', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  
  // SQLite only
  storage: './database'
})



return connection


}
module.exports = executarDB;