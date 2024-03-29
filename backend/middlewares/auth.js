'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'red_social_tfg_radis';

function ensureAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene la cabecera de autentificación'});
    }

    //reemplazar cualquier comilla simple o doble que haya en el token de la cabecera
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }catch(ex){
        return res.status(404).send({message: 'El token no es válido'});
    }
   
    req.user = payload;

    next();
}

module.exports = {
    ensureAuth
}