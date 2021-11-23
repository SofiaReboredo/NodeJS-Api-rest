// Instancio express
const express = require('express');

// Importo los models
require('./middleware/database')
require('./models/SensorModel');
require('./models/ActuadorModel');
require('./models/UsuarioModel');
require('./models/TemperaturaModel');

// Importo rutas
const authRoutes = require('./routes/auth');
const admin = require('./routes/admin');
const verificarToken = require('./routes/validate-token');

// Utilizo express
const app = express();

// Middleware para reconocer el objeto de la petición entrante como JSON
app.use(express.json({ extended: false }));

// Defino el puerto que va a escuchar el servidor.
const port = process.env.PORT || 3000;

// Ante una petición del cliente en la url raíz, por medio del get le envío una respuesta.
app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación')
})

// Defino las rutas de la API
app.use('/api/sensores', require('./routes/sensor'));
app.use('/api/actuadores', require('./routes/actuador'));
app.use('/api/temperatura', require('./routes/temperatura'));
app.use('/api/usuario', authRoutes);
app.use('/api/admin', verificarToken, admin);

// El servidor escucha en el puerto especificado
app.listen(port, () => {
    console.clear();
    console.log('Servidor escuchando en el puerto', port)
})