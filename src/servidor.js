// src/servidor.js
import fs from 'fs';
import path from 'path';
import express from 'express';
import { Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// === LOGS ===
const logPath = path.join(process.cwd(), 'bitacora.log');
function registrarLog(mensaje) {
  const entrada = `[${new Date().toISOString()}] ${mensaje}\n`;
  fs.appendFileSync(logPath, entrada);
}

// === EXPRESS ===
const servidor = Router();

// Middleware
servidor.use(cors({
  origin: ['http://localhost:4200']
}));
servidor.use(morgan('dev'));
servidor.use(express.json());

// Rutas
import routerUsers from './router/routerUsers.js';
import routerProducts from './router/routerProducts.js';
import routerLogin from './router/routerLogin.js';

// Log para /users
servidor.use('/users', (req, res, next) => {
  registrarLog(`Acción: ${req.method} ${req.path}`);
  next();
});
servidor.use('/users', routerUsers);
servidor.use('/login', routerLogin);
servidor.use('/products', routerProducts);

// ✅ Ruta 404: Usa `use` en lugar de `get('*')`
servidor.use((req, res) => {
  registrarLog(`Ruta no encontrada: ${req.method} ${req.path}`);
  res.status(404).send('No encontrado');
});

export default servidor;