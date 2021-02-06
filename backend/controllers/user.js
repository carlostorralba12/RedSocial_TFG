'use strict'
var bcrypt = require('bcrypt-nodejs');

var User = require('../models/user');


function registerUser(req, res){
    var params = req.body;
    var user = new User();

    if(params.name && params.surname && params.email && params.password){
        // OBLIGATORY DATA
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        // OPTIONAL DATA
      
        user.country = params.country;
        user.province = params.province;
        user.city = params.city;
        user.image = params.image;
        
        
        //ciframos contraseña
        bcrypt.hash(params.password, null, null, (err, hash) =>{
            user.password = hash;

        });

        user.save((err, userRegistered) => {
            if(err) return res.status(500).send("Error al guardar un usuario");

            if(userRegistered){
                res.status(200).send({user: userRegistered});
            }
            else{
                res.status(404).send("No se ha registrado el usuario");
            }
        });
    }
    else{
        res.status(200).send("Completa los datos obligatorios");
    }
}

module.exports = {
    registerUser
}