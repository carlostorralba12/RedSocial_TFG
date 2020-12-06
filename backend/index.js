'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:12345/socialNet',  { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => {
        console.log("Conectado con la BD socialNet"); 
    })
    .catch(err => console.log(err));