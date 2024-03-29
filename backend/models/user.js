'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    country: String,
    province: String,
    city: String,
    role: String,
    communities: [{
        _id: String
    }],
    users: [{
        _id: String
    }]
});

module.exports = mongoose.model('User', userSchema);