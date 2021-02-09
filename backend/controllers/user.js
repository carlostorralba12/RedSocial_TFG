'use strict'
var bcrypt = require('bcrypt-nodejs');
var jwtService = require('../services/jwt.service');
var User = require('../models/user');


function login(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email}).exec((err, user) => {
      
        if(err) return res.status(500).send({message: 'Error en la petición'});

        if(user){
            bcrypt.compare(password, user.password, (err, check) => {
                if(err) return res.status(500).send({message: 'Error en la comprobacion de contraseñas'});
                if(check){
                    // return and generate token
                    return res.status(200).send({
                        token: jwtService.createToken(user)
                    });
                   
                }
                else {
                    return res.status(200).send({message: 'Las contraseñas no coinciden'});
                }
            })
        }
        else{
            return res.status(200).send({message: 'El email no existe'});
        }
    });
}

// SAVE A NEW USER
function register(req, res){
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
        user.role = params.role;
        
        // Control duplicate users
        User.find({email: user.email.toLowerCase()}).exec((err, users) => {
            if(err) return res.status(500).send({message: 'Error al guardar un usuario'});

            if(users && users.length >= 1){
                return res.status(200).send({message: 'El email introducido ya existe'});
            }
            // IF email not exists
            else{

                //encode password
                bcrypt.hash(params.password, null, null, (err, hash) =>{
                    user.password = hash;
                    user.save((err, userRegistered) => {
                        if(err) return res.status(500).send({message: 'Error al guardar un usuario'});
    
                        if(userRegistered){
                            res.status(200).send({user: userRegistered});
                        }
                        else{
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }
                    });

                });
            }

        });
      
    }
    else{
        res.status(200).send({message: 'Completa los datos obligatorios'});
    }
}

module.exports = {
    login,
    register
}