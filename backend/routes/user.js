'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var mdAuth = require('../middlewares/auth');
var multipart = require('connect-multiparty');
var mdUpload = multipart({uploadDir: './uploads/users'});

// para acceder a métodos GET, POST, etc.
var api = express.Router();

//Rutas
api.post('/register',mdUpload, UserController.register);
api.post('/login',UserController.login);
api.get('/user', mdAuth.ensureAuth, UserController.getUser);
api.delete('/user', mdAuth.ensureAuth, UserController.deleteUser)

module.exports = api;