const express = require('express');
const session = require('express-session');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const wordRoutes = require('./routes/wordRoutes');
const userRoutes = require('./routes/userRoutes'); 

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'clave secreta',
  resave: false,
  saveUninitialized: true,
}));

// Rutas
app.use(express.static('public')); 
app.use(authRoutes); 
app.use(wordRoutes); 
app.use(userRoutes); 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
