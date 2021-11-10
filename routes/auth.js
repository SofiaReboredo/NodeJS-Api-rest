// Requiero Router desde express
const router = require('express').Router();

// Requiero mongoose para conectar con la base de datos
const mongoose = require('mongoose');

// Defino una variable para ejecutar los métodos, que conectará con la tabla en MongoDB
const Usuario = mongoose.model('Usuario');

// Requiero Joi para realizar validaciones de usuario
const Joi = require('@hapi/joi');

// Requiero bcrypt para encriptar la contraseña del usuario
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

// Defino las validaciones que voy a requerir al postear atributos
const schemaRegister = Joi.object({
    nombre: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    clave: Joi.string().min(6).max(1024).required()
})

// Defino las validaciones que voy a requerir al postear atributos
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    clave: Joi.string().min(6).max(1024).required()
})

// Método POST para realizar el login de un usuario
router.post('/login', async (req, res) => {
    const { error } = schemaLogin.validate(req.body)
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const usuario = await Usuario.findOne({ email: req.body.email });

    if (!usuario) {
        return res.status(400).json({ error: true, mensaje: 'Email no registrado' })
    }

    const claveValida = await bcrypt.compare(req.body.clave, usuario.clave);

    if (!claveValida) {
        return res.status(400).json({ error: true, mensaje: "Contraseña incorrecta" })
    }

    const token = jwt.sign({
        nombre: usuario.nombre,
        id: usuario._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        mensaje: 'Bienvenido a la API',
        data: { token }
    })
});

// Método POST para crear un nuevo usuario en la tabla (se envía un JSON), siempre que se cumpla con las validaciones definidas
router.post('/register', async (req, res) => {
    const { error } = schemaRegister.validate(req.body)
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const existeEmail = await Usuario.findOne({ email: req.body.email });

    const saltos = await bcrypt.genSalt(10);
    const claveEncriptada = await bcrypt.hash(req.body.clave, saltos);

    if (existeEmail) {
        return res.status(400).json({ error: true, mensaje: 'Email ya registrado' })
    }

    const usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        clave: claveEncriptada
    });
    try {
        const usuarioGuardado = await usuario.save();
        res.json({
            error: null,
            data: usuarioGuardado
        })
    } catch (error) {
        res.status(400).json({ error })
    }
});

module.exports = router;