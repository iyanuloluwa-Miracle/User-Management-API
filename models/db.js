
const mysql = require('mysql');
const password = process.env.password
const user = process.env.user

const db = mysql.createConnection({
  host: 'localhost',
  user: user,
  password: password,
  database: 'my_app_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
