// src/index.js
import 'dotenv/config';
import './conexion.js'; // Conexión a MongoDB

import app from './app.js'; // Usa app.js

const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`El servidor está escuchando en http://0.0.0.0:${PORT}`);
});