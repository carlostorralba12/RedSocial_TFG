'use strict'

const mongoose = require("mongoose");
var app = require('./app');
mongoose.set('useFindAndModify', false);
var config = require('./config');

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err, res) {

    if(err){
        console.log("Error al conectar con socialNet: " + `${err}`);
    } else {
        console.log("Conectado con la BD socialNet");
        // Crear servidor web
        app.listen(config.port, function() {
            console.log("Servidor Web: http://localhost:" + `${config.port}`);
        });
    }
});
