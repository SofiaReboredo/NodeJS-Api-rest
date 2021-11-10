// Instancio express
const express = require('express');

// Conexion a mongoose (MongoDb)
const mongoose = require('mongoose');

// Requiero dotenv para configurar variables de entorno 
require('dotenv').config();

// Importo los models
require('./models/SensorModel');
require('./models/UsuarioModel');

// Importo rutas
const authRoutes = require('./routes/auth');
const admin = require('./routes/admin');
const verificarToken = require('./routes/validate-token');

// Utilizo express
const app = express();

// Middleware para reconocer el objeto de la petición entrante como JSON
app.use(express.json({ extended: false }));

// Uri de conexión para base de datos en MongoDB
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.804dd.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlparser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e));

// Defino el puerto que va a escuchar el servidor.
const port = process.env.PORT || 3000;

// Ante una petición del cliente en la url raíz, por medio del get le envío una respuesta.
app.get('/', (req, res) => {
    res.send('Mi respuesta desde express')
})

// Defino las rutas de la API
app.use('/api/sensores', require('./routes/sensor'));
app.use('/api/usuario', authRoutes);
app.use('/api/admin', verificarToken, admin);

// El servidor escucha en el puerto especificado
app.listen(port, () => {
    console.clear();
    console.log('Servidor escuchando en el puerto', port)
})