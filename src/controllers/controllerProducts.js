let productos = [
  { id: 1, nombre: 'Producto 1', precio: 100 },
  { id: 2, nombre: 'Producto 2', precio: 200 }
];

let nextId = 3;

// Controlador de productos
const creacionProducto = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    // Lógica para crear un nuevo producto
    const nuevoProducto = {
      id: nextId++,
      nombre,
      precio
    };

    // En tu caso real, sería:
    // const nuevoProducto = new modelProducts({ nombre, precio });
    // await nuevoProducto.save();

    productos.push(nuevoProducto);

    res.json({
      result: 'fine',
      message: 'Producto creado exitosamente',
      data: nuevoProducto
    });
  } catch (error) {
    res.json({
      result: 'mistake',
      message: 'Error al crear el producto',
      data: error.message
    });
  }
};

const leerProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Lógica para leer un producto por ID
    const producto = productos.find(p => p.id == id);

    if (!producto) {
      return res.status(404).json({
        result: 'mistake',
        message: 'Producto no encontrado'
      });
    }

    res.json({
      result: 'fine',
      message: 'Producto encontrado',
      data: producto
    });
  } catch (error) {
    res.json({
      result: 'mistake',
      message: 'Error al leer el producto',
      data: error.message
    });
  }
};

const leerTodosProductos = async (req, res) => {
  try {
    // Lógica para leer todos los productos
    res.json({
      result: 'fine',
      message: 'Productos encontrados',
      data: productos
    });
  } catch (error) {
    res.json({
      result: 'mistake',
      message: 'Error al leer todos los productos',
      data: error.message
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    // Lógica para actualizar un producto
    const producto = productos.find((p, index) => {
      if (p.id == id) {
        productos[index] = { ...p, nombre, precio };
        return true;
      }
      return false;
    });

    if (!producto) {
      return res.status(404).json({
        result: 'mistake',
        message: 'Producto no encontrado'
      });
    }

    res.json({
      result: 'fine',
      message: 'Producto actualizado',
      data: producto
    });
  } catch (error) {
    res.json({
      result: 'mistake',
      message: 'Error al actualizar el producto',
      data: error.message
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Lógica para eliminar un producto
    const index = productos.findIndex(p => p.id == id);

    if (index === -1) {
      return res.status(404).json({
        result: 'mistake',
        message: 'Producto no encontrado'
      });
    }

    const productoEliminado = productos.splice(index, 1)[0];

    res.json({
      result: 'fine',
      message: 'Producto eliminado',
      data: productoEliminado
    });
  } catch (error) {
    res.json({
      result: 'mistake',
      message: 'Error al eliminar el producto',
      data: error.message
    });
  }
};

// Exporta todas las funciones como un objeto default
export default {
  creacionProducto,
  leerProducto,
  leerTodosProductos,
  actualizarProducto,
  eliminarProducto
};