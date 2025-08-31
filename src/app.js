// src/app.js
import express from 'express';
import cors from 'cors';

// Importa las rutas desde la carpeta 'router' (no 'routes')
import routerProducts from './router/routerProducts.js';
import routerUsers from './router/routerUsers.js';
import routerLogin from './router/routerLogin.js';

const app = express();

// Middleware CORS con credentials: true
app.use(cors({
  origin: 'http://ss3-1039461745.s3-website-us-east-1.amazonaws.com',
  credentials: true
}));

// Middleware esencial
app.use(express.json());

// Monta las rutas
app.use('/products', routerProducts);
app.use('/users', routerUsers);
app.use('/login', routerLogin);

// Ruta 404 opcional
app.use((req, res) => {
  res.status(404).json({
    result: 'error',
    message: 'Ruta no encontrada'
  });
});

export default app;

// Forzar redeploy en Railway