import { uploadSingleImage } from '../middlewares/upload.js';
import fs from 'fs';
import path from 'path';
import modelProducts from '../models/modelProducts.js';

const controladorProductos = {
    creacionProducto: async (req, res) => {
        try {
            uploadSingleImage(req, res, async (error) => {
                if (error) {
                    return res.json({
                        result: 'mistake',
                        message: 'An error occurred while uploading the image',
                        data: error,
                    });
                }
                const newProduct = new modelProducts({
                    tipoProducto: req.body.tipoProducto,
                    serialProducto: req.body.serialProducto,
                    marcaProducto: req.body.marcaProducto,
                    precioProducto: req.body.precioProducto,
                    colorProducto: req.body.colorProducto,
                    imagen: req.file ? req.file.filename : null,
                });

                const saveProduct = await newProduct.save();
                res.json({
                    result: 'fine',
                    message: 'Product created',
                    data: saveProduct,
                });
            });
        } catch (error) {
            res.json({
                result: 'mistake',
                message: 'An error occurred creating the product',
                data: error,
            });
        }
    },

    leerProducto: async (req, res) => {
        try {
            const productFound = await modelProducts.findById(req.params.id);
            if (productFound) {
                res.json({
                    result: 'fine',
                    message: 'Product read',
                    data: productFound,
                });
            } else {
                res.status(404).json({
                    result: 'mistake',
                    message: 'Product not found',
                    data: null,
                });
            }
        } catch (error) {
            res.json({
                result: 'mistake',
                message: 'An error occurred reading the product',
                data: error,
            });
        }
    },

    leerTodosProductos: async (req, res) => {
        try {
            const allProductsFound = await modelProducts.find();
            res.json({
                result: 'fine',
                message: 'Products found',
                data: allProductsFound,
            });
        } catch (error) {
            res.json({
                result: 'mistake',
                message: 'An error occurred reading all products',
                data: error,
            });
        }
    },

    actualizarProducto: async (req, res) => {
        try {
            uploadSingleImage(req, res, async (error) => {
                if (error) {
                    return res.json({
                        result: 'mistake',
                        message: 'Error uploading image during update',
                        data: error,
                    });
                }

                const productExistente = await modelProducts.findById(req.params.id);
                if (!productExistente) {
                    return res.status(404).json({
                        result: 'mistake',
                        message: 'Product not found',
                        data: null,
                    });
                }

                if (req.file) {
                    const rutaImagenAntigua = path.join('imagenes', productExistente.imagen);
                    if (fs.existsSync(rutaImagenAntigua)) {
                        fs.unlinkSync(rutaImagenAntigua);
                    }
                }

                const nuevosDatos = {
                    tipoProducto: req.body.tipoProducto,
                    serialProducto: req.body.serialProducto,
                    marcaProducto: req.body.marcaProducto,
                    precioProducto: req.body.precioProducto,
                    colorProducto: req.body.colorProducto,
                    imagen: req.file ? req.file.filename : productExistente.imagen,
                };

                const productoActualizado = await modelProducts.findByIdAndUpdate(
                    req.params.id,
                    nuevosDatos,
                    { new: true }
                );
                res.json({
                    result: 'fine',
                    message: 'Product updated',
                    data: productoActualizado,
                });
            });
        } catch (error) {
            res.json({
                result: 'mistake',
                message: 'An error occurred updating the product',
                data: error,
            });
        }
    },

    eliminarProducto: async (req, res) => {
        try {
            const productDelete = await modelProducts.findByIdAndDelete(req.params.id);

            if (productDelete) {
                const rutaImagen = path.join('imagenes', productDelete.imagen);
                if (fs.existsSync(rutaImagen)) {
                    fs.unlinkSync(rutaImagen);
                }
                res.json({
                    result: 'fine',
                    message: 'Product deleted',
                    data: productDelete,
                });
            } else {
                res.status(404).json({
                    result: 'mistake',
                    message: 'Product not found',
                    data: null,
                });
            }
        } catch (error) {
            res.json({
                result: 'mistake',
                message: 'An error occurred deleting the product',
                data: error,
            });
        }
    }
};

export default controladorProductos;