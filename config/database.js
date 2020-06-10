const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-east-05.cleardb.net",
  user: "b7798968037ed4",
  password: "fb0cbe00",
  database: "heroku_65264d775769621",
});

pool.query = util.promisify(pool.query);
module.exports = pool;
