'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'red_social_tfg_radis';

function createToken (user){

    var payload = {
        sub: user._id,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret)

}

function decodeToken (token) {

    return jwt.decode(token, secret);

}

module.exports = {
    createToken,
    decodeToken
}
