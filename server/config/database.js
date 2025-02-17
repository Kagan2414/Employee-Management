const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2414',
  database: 'employee_management'
}).promise();

module.exports = pool;