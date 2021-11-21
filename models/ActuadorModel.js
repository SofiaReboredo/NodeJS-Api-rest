const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actuadorSchema = new Schema({
    nombre: String,
    descripcion: String,
    status: Boolean,
})

// Crea modelo actuador
const Actuador = mongoose.model('Actuador', actuadorSchema);

module.exports = Actuador;


