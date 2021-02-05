'user strict'

// Framework para trabajar con http y rutas
var express = require('express');
// Convierte cuerpo de la petición a JSON
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var usersRoutes = require('./routes/user');

// middlewares para utilizar peticiones
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// rutas

app.use('/api', usersRoutes);

module.exports = app;
