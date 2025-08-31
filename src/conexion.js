// src/conexion.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.log('❌ Error al conectar a MongoDB:', error);
    throw error;
  }
};

export default connectDB;