const db = require('../config/db'); // Base de datos

// Obtener un usuario por ID
const getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuario' });
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(result[0]);
  });
};

// Actualizar datos de usuario
const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  db.query(
    'UPDATE users SET username = ?, email = ? WHERE id = ?',
    [username, email, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    }
  );
};

module.exports = { getUserById, updateUser };
