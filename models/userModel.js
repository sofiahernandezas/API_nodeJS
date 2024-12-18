const db = require('../config/db'); 

const UserModel = {
  create: (username, hashedPassword) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]); // Devuelve el primer resultado
        }
      );
    });
  },
};

module.exports = UserModel;