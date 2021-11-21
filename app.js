// Instancio express
const express = require('express');

<<<<<<< HEAD
// Conexion a mongoose (MongoDb)
const mongoose = require('mongoose');
const mongooseMiddleware = require('./middleware/dbConection');

// Requiero dotenv para configurar variables de entorno 
require('dotenv').config();

// Importo los models
require('./models/SensorModel');
require('./models/UsuarioModel');
require('./models/ActuadorModel');

=======
// Importo los models
require('./models/SensorModel');
require('./models/UsuarioModel');
require('./middleware/database')
>>>>>>> 3985127fc8f5cb9a08daf978870bbfa73bc85682

// Importo rutas
const authRoutes = require('./routes/auth');
const admin = require('./routes/admin');
const verificarToken = require('./routes/validate-token');

// Utilizo express
const app = express();

// Middleware para reconocer el objeto de la petición entrante como JSON
app.use(express.json({ extended: false }));
<<<<<<< HEAD
//Middleware para DB
app.use(mongooseMiddleware);
=======
>>>>>>> 3985127fc8f5cb9a08daf978870bbfa73bc85682

// Defino el puerto que va a escuchar el servidor.
const port = process.env.PORT || 3000;

// Ante una petición del cliente en la url raíz, por medio del get le envío una respuesta.
app.get('/', (req, res) => {
    res.send('Datos recibidos OK')
})

// Defino las rutas de la API
app.use('/api/sensores', require('./routes/sensor'));
app.use('/api/actuadores', require('./routes/actuador'));
app.use('/api/usuario', authRoutes);
app.use('/api/admin', verificarToken, admin);

// El servidor escucha en el puerto especificado
app.listen(port, () => {
    console.clear();
    console.log('Servidor escuchando en el puerto', port)
})