// Conexion a mongoose (MongoDb)
const mongoose = require('mongoose');

// Requiero dotenv para configurar variables de entorno 
require('dotenv').config();

// Uri de conexión para base de datos en MongoDB
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.804dd.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://admindb:tincho01@mongodbtest.r5i8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlparser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e));
