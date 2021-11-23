// Requiero Router, obtenido desde express
const router = require('express').Router();

// Requiero mongoose para conectar con la base de datos
const mongoose = require('mongoose');

// Defino una variable para ejecutar los métodos, que conectará con la tabla en MongoDB
const Actuador = mongoose.model('Actuador');

// Método GET para obtener todos los actuadores de la tabla
router.get('/', (req, res) => {
    Actuador.find().then(data => res.json(data)).catch(err => res.status(500).json(err));
});

// Método GET para obtener un actuador de la tabla según el id enviado por parámetro
router.get('/:id', (req, res) => {
    const { params: { id } } = req;
    Actuador.findById(id)
        .then(data => {
            if (!data) res.status(404).json({ error: 'No encontrado', message: `Actuador con id "${id} no encontrado"` })
            res.json(data);
        })
        .catch(err => res.status(500).json(err))
});

// Método POST para crear un nuevo actuador en la tabla (se envía un JSON)
router.post('/', (req, res) => {
    const { body } = req;

    const actuador = new Actuador({
        ...body
    });

    actuador.save().then(s => res.json(s)).catch(err => res.status(500).json(err));
});

// Método PATCH para actualizar atributos de un actuador de la tabla según el id enviado por parámetro
router.patch('/:id', (req, res) => {
    const { params: { id }, body } = req;

    Actuador.findByIdAndUpdate(id, { ...body })
        .then(data => {
            if (!data) res.status(404).json({ error: 'No encontrado', message: `Actuador con id "${id} no encontrado"` });
            res.status(201).json({ status: 'Actualizado', message: `Actuador con id "${id} actualizado"` });
        })
        .catch(err => res.status(500).json(err));
});

// Método DELETE para eliminar un actuador de la tabla según el id enviado por parámetro
router.delete('/:id', (req, res) => {
    const { params: { id } } = req;

    Actuador.findByIdAndDelete(id)
        .then((data) => {
            if (!data) res.status(404).json({ error: 'No encontrado', message: `Actuador con id "${id} no encontrado"` })
            res.json({ status: `${id} eliminado` })
        })
        .catch(error => res.status(500).json(error));
});

module.exports = router;