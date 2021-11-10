const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    clave: {
        type: String,
        required: true,
        minlength: 6
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

// Crea modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

