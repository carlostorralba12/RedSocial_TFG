'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'red_social_tfg_radis';

function createToken (user){

    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        image: user.image,
        country: user.country,
        province: user.province,
        city: user.city,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret)

}

module.exports = {
    createToken
}
