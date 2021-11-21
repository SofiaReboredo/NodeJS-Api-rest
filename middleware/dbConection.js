const mongoose = require('mongoose');
//const filesHandler = require('../middleware/filesHandler');

//let conexionArray = filesHandler.leerArchivoComoString("../startConfig.cfg")
//console.log(conexionArray);

const dbconnect = (req, res, next) => {
    // const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.804dd.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
    const uri = `mongodb+srv://admindb:tincho01@mongodbtest.r5i8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    //const uri = `mongodb+srv://conexionArray[0]:conexionArray[1]@mongodbtest.r5i8f.mongodb.net/conexionArray[2]?retryWrites=true&w=majority`;
    mongoose.connect(uri, { useNewUrlparser: true, useUnifiedTopology: true })
        .then(() => console.log('Base de datos OK'))
        .catch(e => console.log(e));

    next();
}

module.exports = dbconnect;