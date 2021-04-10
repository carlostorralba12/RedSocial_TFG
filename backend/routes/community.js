'use strict'
var express = require('express');
var CommunityController = require('../controllers/community');
var mdAuth = require('../middlewares/auth');

// para acceder a métodos GET, POST, etc.
var api = express.Router();

api.post('/community', mdAuth.ensureAuth, CommunityController.saveCommunity);
api.delete('/community/:id', mdAuth.ensureAuth, CommunityController.deleteCommunity);
api.get('/community/:id', mdAuth.ensureAuth, CommunityController.getCommunity);
api.put('/community/:id', mdAuth.ensureAuth, CommunityController.updateCommunity);
api.get('/communities', mdAuth.ensureAuth, CommunityController.getCommunities);
api.post('/community/:id/discussion', mdAuth.ensureAuth, CommunityController.addDiscussion);
api.delete('/community/:idCom/discussion/:idDis', mdAuth.ensureAuth, CommunityController.deleteDiscussion);
api.put('/community/:idCom/discussion/:idDis', mdAuth.ensureAuth, CommunityController.updateDiscussion);
api.get('/community/:idCom/discussion/:idDis', mdAuth.ensureAuth, CommunityController.getDiscussion);
api.get('/community/:idCom/discussions', mdAuth.ensureAuth, CommunityController.getDiscussions)
module.exports = api