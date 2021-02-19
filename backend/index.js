'use strict'


var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var app = require('./app');

// Conexion a la base de datos
var socialNet = 'mongodb://localhost:27017/socialNet';

mongoose.connect(socialNet, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err, res) {

    if(err){
        console.log("Error al conectar con socialNet: " + `${err}`);
    } else {
        console.log("Conectado con la BD socialNet");
        // Crear servidor web
        app.listen(3000, function() {
            console.log("Servidor Web: http://localhost:3000");
        });
    }

});
    
