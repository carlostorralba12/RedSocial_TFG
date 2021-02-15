'use strict'
var bcrypt = require('bcrypt-nodejs');
var jwtService = require('../services/jwt.service');
var User = require('../models/user');
var fs = require('fs');
var path = require('path');
const { param } = require('../routes/user');

// Login user
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
    if(params.name && params.surname && params.email && params.password && params.role){
        // OBLIGATORY DATA
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        // OPTIONAL DATA
        user.country = params.country;
        user.province = params.province;
        user.city = params.city;
        user.role = params.role;
        // IMAGE
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[2];
            var extSplit = fileName.split('\.');
            var extFile = extSplit[1];

            if(extFile == 'png' || extFile == 'jpg' || extFile == 'jpeg' || extFile == 'gif'){

                user.image = fileName;

            } else{
                return fs.unlink(filePath, (err) => {
                    res.status(200).send({message: 'La imagen no tiene el formato adecuado: (jpg, png, jpeg, gif)'});
                });
               
            }
        
        }
        
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
                            userRegistered.password = undefined;
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

function getUser(req, res) {

    var token = req.headers.authorization;
    var user = jwtService.decodeToken(token);
    User.findById(user.sub, (err, userFind) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!userFind) return res.status(404).send({message: 'El usuario no existe'});

        userFind.password = undefined;
        return res.status(200).send({user: userFind});

    });

}

function deleteUser(req, res) {

    var token = req.headers.authorization;
    var user = jwtService.decodeToken(token);

    User.findByIdAndDelete(user.sub, (err, userDeleted) => {
        if(err){
            return res.status(500).send({message: 'Error en la petición'});
        }else {
            return res.status(200).send({user: userDeleted});
        }
    });
}


module.exports = {
    login,
    register,
    getUser,
    deleteUser
}