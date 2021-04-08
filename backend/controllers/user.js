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
        user.image = params.image;
        
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

// Save user with admin
function saveUser(req, res){
    var token = req.headers.authorization;
    var userAdmin = jwtService.decodeToken(token);
    if(userAdmin.role != 'admin'){
        return res.status(403).send({message: 'No tienes permisios de administrador'});
    }
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
        user.image = params.image;
        
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

function getProfile(req, res) {

    var token = req.headers.authorization;
    var user = jwtService.decodeToken(token);
    User.findById(user.sub, (err, userFind) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!userFind) return res.status(404).send({message: 'El usuario no existe'});

        userFind.password = undefined;
        return res.status(200).send({user: userFind});

    });

}

function getUser(req, res) {

    var id = req.params.id;
    User.findById(id, (err, userFind) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!userFind) return res.status(404).send({message: 'El usuario no existe'});

        userFind.password = undefined;
        return res.status(200).send({user: userFind});

    });

}

function getUsers(req, res) {

    User.find((err, users) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!users) return res.status(404).send({message: 'El usuario no existe'});
        users.forEach(user => {
            user.password = undefined;
        });
        return res.status(200).send({users: users});

    });

}

function updateUser(req, res){

    var userToUpdate = req.body;

    var token = req.headers.authorization;
    var userToken = jwtService.decodeToken(token);
    var id = req.params.id;
    if(userToken.role != 'admin'){
        if(userToken.sub != id){
            return res.status(403).send({message: 'No tienes permisios de administrador'});
        }
    }
   

    // Control duplicate email to update
    User.find({email: userToUpdate.email.toLowerCase()}).exec((err, users) => {
        if(err) return res.status(500).send({message: 'Error al guardar un usuario'});
        
        if(users && users.length >= 1 && userToken.email != userToUpdate.email){
            // comprobamos que el id a actualizar no es igual a los obtenidos
            for(var i = 0; i < users.length; i++){
                if(users[i]._id != id){
                    return res.status(200).send({message: 'El email introducido ya existe'});
                }
                else {
                    if(i + 1 == users.length){
                        User.findByIdAndUpdate(id, userToUpdate, {new: true}, (err, userUpdated) => {
                            if(err) return res.status(500).send({message: 'Error en la petición'});
                            if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                            // No enviamos la password
                            userUpdated.password = undefined;
                            return res.status(200).send({user: userUpdated});
                        });
                    }
                }
            }
            
        } else {


            User.findByIdAndUpdate(id, userToUpdate, {new: true}, (err, userUpdated) => {
                if(err) return res.status(500).send({message: 'Error en la petición'});
                if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                // No enviamos la password
                userUpdated.password = undefined;
                return res.status(200).send({user: userUpdated});
            });

        }

    });
  
}

function deleteUser(req, res) {

    var token = req.headers.authorization;
    var userToken = jwtService.decodeToken(token);
    var id = req.params.id;;
    if(userToken.role != 'admin'){
        if(userToken.sub != id){
            return res.status(403).send({message: 'No tienes permisios de administrador'});
        }
    }
    User.findByIdAndDelete(id, (err, userDeleted) => {
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
    deleteUser,
    updateUser,
    getUsers,
    getProfile,
    saveUser
}