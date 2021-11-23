const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const temperaturaSchema = new Schema({
    unidadMedicion: String,
    valor: Number,
    fecha: {
        type: Date,
        default: Date.now
    }
})

// Crea modelo Temperatura
const Temperatura = mongoose.model('Temperatura', temperaturaSchema);

module.exports = Temperatura;


