'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var mdAuth = require('../middlewares/auth');

// para acceder a métodos GET, POST, etc.
var api = express.Router();

//Rutas auth
api.post('/register', UserController.register);
api.post('/login',UserController.login);
//Rutas user
api.post('/users',mdAuth.ensureAuth, UserController.saveUser);
api.get('/users/profile', mdAuth.ensureAuth, UserController.getProfile);
api.get('/users/:id', mdAuth.ensureAuth, UserController.getUser);
api.put('/users/:id', mdAuth.ensureAuth, UserController.updateUser);
api.delete('/users/:id', mdAuth.ensureAuth, UserController.deleteUser);
api.get('/users', mdAuth.ensureAuth, UserController.getUsers);

module.exports = api;