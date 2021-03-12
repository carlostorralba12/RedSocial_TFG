'use strict'
var express = require('express');
var CommunityController = require('../controllers/community');
var mdAuth = require('../middlewares/auth');

// para acceder a métodos GET, POST, etc.
var api = express.Router();

api.post('/community', mdAuth.ensureAuth, CommunityController.saveCommunity);
api.delete('/community', mdAuth.ensureAuth, CommunityController.deleteCommunity);
api.get('/community', mdAuth.ensureAuth, CommunityController.getCommunity);
api.put('/community', mdAuth.ensureAuth, CommunityController.updateCommunity);
api.get('/communities', mdAuth.ensureAuth, CommunityController.getCommunities);

module.exports = api