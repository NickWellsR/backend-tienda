// src/controllers/controllerUsers.js
import bcrypt from 'bcryptjs';
import modelUsers from "../models/modelUsers.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const controllerUsers = {
  crearUsuario: async (sol, res) => {
  try {
    const { name, email, password, rol } = sol.body;
    const passwordProtected = await bcrypt.hash(password, 10);
    const newUser = new modelUsers({
      name,
      email,
      password: passwordProtected,
      rol: rol || 'user'
    });
    const userCreate = await newUser.save();
    if (userCreate._id) {
      res.json({
        result: 'fine',
        message: 'User created',
        data: userCreate._id
      });
    }
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.json({
      result: 'mistake',
      message: 'An error occurred while creating the user',
      data: error && error.message ? error.message : error
    });
  }
},
  leerUsuario: async (sol, res) => {
    try {
      const userFound = await modelUsers.findById(sol.params.id);
      if (userFound._id) {
        res.json({
          result: 'fine',
          message: 'User found',
          data: userFound,
        });
      }
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'An error occurred while reading the user',
         error,
      });
    }
  },
  leerTodosUsuarios: async (sol, res) => {
    try {
      const allUserFound = await modelUsers.find();
      res.json({
        result: 'fine',
        message: 'User found',
        data: allUserFound,
      });
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'An error occurred while reading all users',
         error,
      });
    }
  },
  actualizarUsuario: async (sol, res) => {
  try {
    const userUpdate = await modelUsers.findByIdAndUpdate(sol.params.id, sol.body);
    if (userUpdate._id) {
      res.json({
        result: 'fine',
        message: 'User updated',
        data: userUpdate._id
      });
    }
  } catch (error) {
    res.json({
      result: 'mistake',
      message: 'An error occurred while updating user',
      data: error
    });
  }
},
  eliminarUsuario: async (sol, res) => {
    try {
      const userDelete = await modelUsers.findByIdAndDelete(sol.params.id);
      if (userDelete._id) {
        res.json({
          result: 'fine',
          message: 'User deleted',
          data: null,
        });
      }
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'An error occurred while deleting user',
         error,
      });
    }
  }
};

export const contrasenaOlvidada = async (sol, res) => {
  try {
    const { email } = sol.body;
    const user = await modelUsers.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No se encontró el correo registrado en la base de datos' });
    }
    const nuevaPassword = crypto.randomBytes(6).toString('hex');
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
    user.password = hashedPassword;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bitgrupo255@gmail.com',
        pass: 'plptczqbpoqkngkc'
      },
    });

    const mailOptions = {
      from: 'bitgrupo255@gmail.com',
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Hola ${user.name}, \n\nTu nueva contraseña es: ${nuevaPassword}\n\nRecuerda actualizar tu contraseña en tu perfil por seguridad. \n\nSaludos desde el área de soporte.`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Se ha enviado una nueva contraseña al correo registrado.' });
  } catch (error) {
    console.error('Error al recuperar la contraseña', error);
    res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
  }
};

export default controllerUsers;