// src/router/routerProducts.js
import { Router } from 'express';
import controllerProducts from '../controllers/controllerProducts.js';

const routerProducts = Router();

routerProducts.post('/', controllerProducts.creacionProducto);
routerProducts.get('/:id', controllerProducts.leerProducto);
routerProducts.get('/', controllerProducts.leerTodosProductos);
routerProducts.put('/:id', controllerProducts.actualizarProducto);
routerProducts.delete('/:id', controllerProducts.eliminarProducto);

export default routerProducts;