// Requiero Router desde express
const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            titulo: 'Mi ruta protegida',
            usuario: req.usuario
        }
    })
})

module.exports = router