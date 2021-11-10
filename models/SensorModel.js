const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorSchema = new Schema({
    nombre: String,
    descripcion: String,
})

// Crea modelo sensor
const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;


