// controllers/controllerLogin.js
import modelUsers from '../models/modelUsers.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.SECRET_KEY;

const iniciarSesion = async (req, res) => {
  try {
    console.log('POST /login body:', req.body); // <-- Depuración
    const { email, password } = req.body;
    const user = await modelUsers.findOne({ email });

    if (!user) {
      console.log('Usuario no encontrado:', email); // <-- Depuración
      return res.status(404).json({
        result: 'mistake',
        message: 'Usuario no encontrado',
        data: null
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Contraseña incorrecta para:', email); // <-- Depuración
      return res.status(400).json({
        result: 'mistake',
        message: 'Contraseña incorrecta',
        data: null
      });
    }

    const token = jwt.sign({ id: user._id, rol: user.rol }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      result: 'fine',
      message: 'Inicio de sesión exitoso',
      data: { token, user: { name: user.name, email: user.email, rol: user.rol } }
    });
  } catch (error) {
    console.error('Error en iniciarSesion:', error); // <-- Depuración
    res.status(500).json({
      result: 'mistake',
      message: 'Error en el servidor',
      data: error.message
    });
  }
};

const validarToken = async (req, res) => {
  try {
    const { token } = req.params;
    jwt.verify(token, SECRET_KEY);
    res.json({ valid: true });
  } catch (error) {
    res.json({ valid: false });
  }
};

export default {
  iniciarSesion,
  validarToken
};