'user strict'

// Framework para trabajar con http y rutas
var express = require('express');
// Convierte cuerpo de la petición a JSON
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var usersRoutes = require('./routes/user');

//cors
// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


// middlewares para utilizar peticiones
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// rutas

app.use('/api', usersRoutes);

module.exports = app;
