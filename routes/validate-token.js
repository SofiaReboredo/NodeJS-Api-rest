 // requiero jsonWebToken para validar el token de acceso
const jwt = require('jsonwebtoken');

// Valido que el token sea válido
const verificarToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET)
        req.usuario = verificar
        next()
    } catch (error) {
        res.status(400).json({ error: 'Token no es válido', mensaje: 'El token recibido no pertenece a un usuario'})
    }
}

module.exports = verificarToken;