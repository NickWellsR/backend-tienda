// src/router/routerUsers.js
import { Router } from 'express';
import controllerUsers, { contrasenaOlvidada } from '../controllers/controllerUsers.js';

const routerUsers = Router();

routerUsers.post('/', controllerUsers.crearUsuario);
routerUsers.get('/:id', controllerUsers.leerUsuario);
routerUsers.get('/', controllerUsers.leerTodosUsuarios);
routerUsers.put('/:id', controllerUsers.actualizarUsuario);
routerUsers.delete('/:id', controllerUsers.eliminarUsuario);
routerUsers.post('/forgot-password', contrasenaOlvidada);

export default routerUsers;