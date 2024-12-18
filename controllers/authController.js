
const db = require('../config/db'); 
const bcrypt = require('bcryptjs');// Para almacenar contraseñas de forma segura en las aplicaciones
const jwt = require('jsonwebtoken');

// Función para registrar un usuario
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Error al verificar usuario');
    if (results.length > 0) {
      return res.status(400).send('El nombre de usuario ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).send('Error al registrar usuario');
      res.status(201).send('Usuario registrado correctamente');
    });
  });
};

// Función para iniciar sesión
const loginUser = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Error al iniciar sesión');
    if (results.length === 0) return res.status(404).send('Usuario no encontrado');
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Contraseña incorrecta');

    // Crear un token JWT
    const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });

    // Guardar el token en la sesión
    req.session.token = token;
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  });
};

// Función para cerrar sesión
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.status(200).send('Sesión cerrada');
  });
};

// Exporta las funciones correctamente
module.exports = { registerUser, loginUser, logoutUser };