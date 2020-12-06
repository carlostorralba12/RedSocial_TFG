'user strict'

// Framework para trabajar con http y rutas
var express = require('express');
// Convierte cuerpo de la petición a JSON
var bodyParser = require('body-parser');

var app = express();

// middlewares para utilizar peticiones
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    
   res.send("Bienvenido al servidor Web");

});

module.exports = app;
