// test/user.test.js
import { expect, jest } from '@jest/globals';
import request from 'supertest';
import app from './app.js'; // ✅ Usa el app completo
import mongoose from 'mongoose';

jest.setTimeout(20000);

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB);
    console.log('✅ Conexión a MongoDB establecida para pruebas');
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  console.log('🔌 Conexión a MongoDB cerrada');
});

describe('Pruebas de integración de usuarios', () => {
  it('Debe responder con lista de usuarios', async () => {
    const res = await request(app).get('/users');
    console.log('Respuesta completa:', res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});