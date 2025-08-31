import {Schema, model} from 'mongoose';

const esquemaProducto = new Schema({
    tipoProducto: {type: String, required: true},
    serialProducto: {type: String, required: true},
    marcaProducto: {type: String, required: true},
    precioProducto: {type: Number, required: true},
    colorProducto: {type: String, required: true},
    imagen: {type: String, required: true},
},
{
    versionKey: false,
    timestamps: true,
}
);

export default model ('productos', esquemaProducto);

