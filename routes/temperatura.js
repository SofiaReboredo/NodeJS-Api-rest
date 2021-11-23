// requiero Router, obtenido desde express
const router = require('express').Router();

// Requiero mongoose para conectar con la base de datos
const mongoose = require('mongoose');

// Defino una variable para ejecutar los métodos, que conectará con la tabla en MongoDB
const Temperatura = mongoose.model('Temperatura');

// Método GET para obtener todos los valores de medición de la temperatura de la tabla
router.get('/', (req, res) => {
    Temperatura.find().then(data => res.json(data)).catch(err => res.status(500).json(err));
});

// Método GET para obtener un valor de medición de la temperatura de la tabla según el id enviado por parámetro
router.get('/:id', (req, res) => {
    const { params: { id } } = req;
    Temperatura.findById(id)
        .then(data => {
            if (!data) res.status(404).json({ error: 'No se encontró', message: `temperatura con id "${id} no fue encontrado"` })
            res.json(data);
        })
        .catch(err => res.status(500).json(err))
});

// Método POST para crear un nuevo valor de medición de la temperatura en la tabla (se envía un JSON)
router.post('/', (req, res) => {
    const { body } = req;

    const temperatura = new Temperatura({
        ...body
    });

    temperatura.save().then(s => res.json(s)).catch(err => res.status(500).json(err));
});

// Método PATCH para actualizar atributos de un valor de medición de la temperatura de la tabla según el id enviado por parámetro
router.patch('/:id', (req, res) => {
    const { params: { id }, body } = req;

    Temperatura.findByIdAndUpdate(id, { ...body })
        .then(data => {
            if (!data) res.status(404).json({ error: 'No se encontró', message: `temperatura con id "${id} no fue encontrado"` });
            res.status(201).json({ status: 'Actualizado', message: `Temperatura con id "${id} actualizada"` });
        })
        .catch(err => res.status(500).json(err));
});

// Método DELETE para eliminar un valor de medición de la temperatura de la tabla según el id enviado por parámetro
router.delete('/:id', (req, res) => {
    const { params: { id } } = req;

    Temperatura.findByIdAndDelete(id)
        .then((data) => {
            if (!data) res.status(404).json({ error: 'No se encontró', message: `temperatura con id "${id} no fue encontrado"` })
            res.json({ status: `${id} eliminado` })
        })
        .catch(error => res.status(500).json(error));
});

module.exports = router;