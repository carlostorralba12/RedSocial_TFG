'use strict'

var express = require('express');
var UserController = require('../controllers/user');

// para acceder a métodos GET, POST, etc.
var api = express.Router();

//Rutas
api.post('/register', UserController.register);
api.post('/login', UserController.login);


module.exports = api;