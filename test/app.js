// test/app.js
import express from 'express';
import servidor from '../src/servidor.js';

const app = express();

// Middleware necesario
app.use(express.json());

// Monta el router
app.use('/', servidor);

export default app;