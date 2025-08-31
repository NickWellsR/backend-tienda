// test/setup.js
import 'dotenv/config';

console.log('🔹 .env cargado para pruebas');
console.log('🔹 MONGODB:', process.env.MONGODB ? 'OK' : 'NO ENCONTRADO');