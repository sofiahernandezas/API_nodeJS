const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'app_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

module.exports = db;
