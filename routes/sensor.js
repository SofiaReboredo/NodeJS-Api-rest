// requiero Router, obtenido desde express
const router = require('express').Router();

// Requiero mongoose para conectar con la base de datos
const mongoose = require('mongoose');

// Defino una variable para ejecutar los métodos, que conectará con la tabla en MongoDB
const Sensor = mongoose.model('Sensor');

// Método GET para obtener todos los sensores de la tabla
router.get('/', (req, res) => {
    Sensor.find().then(data => res.json(data)).catch(err => res.status(500).json(err));
});

// Método GET para obtener un sensor de la tabla según el id enviado por parámetro
router.get('/:id', (req, res) => {
    const { params: { id } } = req;
    Sensor.findById(id)
        .then(data => {
            if (!data) res.status(404).json({ error: 'Not found', message: `Sensor with id "${id} not found"` })
            res.json(data);
        })
        .catch(err => res.status(500).json(err))
});

// Método POST para crear un nuevo sensor en la tabla (se envía un JSON)
router.post('/', (req, res) => {
    const { body } = req;

    const sensor = new Sensor({
        ...body
    });

    sensor.save().then(s => res.json(s)).catch(err => res.status(500).json(err));
});

// Método PATCH para actualizar atributos de un sensor de la tabla según el id enviado por parámetro
router.patch('/:id', (req, res) => {
    const { params: { id }, body } = req;

    Sensor.findByIdAndUpdate(id, { ...body })
        .then(data => {
            if (!data) res.status(404).json({ error: 'Not found', message: `Sensor with id "${id} not found"` });
            res.status(201).json({ status: 'Updated', message: `Sensor with id "${id} updated"` });
        })
        .catch(err => res.status(500).json(err));
});

// Método DELETE para eliminar un sensor de la tabla según el id enviado por parámetro
router.delete('/:id', (req, res) => {
    const { params: { id } } = req;

    Sensor.findByIdAndDelete(id)
        .then((data) => {
            if (!data) res.status(404).json({ error: 'Not found', message: `Sensor with id "${id} not found"` })
            res.json({ status: `${id} deleted` })
        })
        .catch(error => res.status(500).json(error));
});

module.exports = router;