const mysql = require("mysql2");
require("dotenv").config();

module.exports = mysql.createConnection({
  host: "localhost",
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
});
