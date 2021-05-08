'use strict'
var express = require('express');
var CommunityController = require('../controllers/community');
var mdAuth = require('../middlewares/auth');

// para acceder a métodos GET, POST, etc.
var api = express.Router();
//COMMUNITIES
api.post('/community', mdAuth.ensureAuth, CommunityController.saveCommunity);
api.delete('/community/:id', mdAuth.ensureAuth, CommunityController.deleteCommunity);
api.get('/community/:id', mdAuth.ensureAuth, CommunityController.getCommunity);
api.put('/community/:id', mdAuth.ensureAuth, CommunityController.updateCommunity);
api.get('/communities', mdAuth.ensureAuth, CommunityController.getCommunities);
//DISCUSSIONS
api.post('/community/:id/discussion', mdAuth.ensureAuth, CommunityController.addDiscussion);
api.delete('/community/:idCom/discussion/:idDis', mdAuth.ensureAuth, CommunityController.deleteDiscussion);
api.put('/community/:idCom/discussion/:idDis', mdAuth.ensureAuth, CommunityController.updateDiscussion);
api.get('/community/:idCom/discussion/:idDis', mdAuth.ensureAuth, CommunityController.getDiscussion);
api.get('/community/:idCom/discussions', mdAuth.ensureAuth, CommunityController.getDiscussions)
//POSTS
api.post('/community/:idCom/discussion/:idDis/posts', mdAuth.ensureAuth, CommunityController.addPost)
api.delete('/community/:idCom/discussion/:idDis/posts/:idPost', mdAuth.ensureAuth, CommunityController.deletePost)
api.put('/community/:idCom/discussion/:idDis/posts/:idPost', mdAuth.ensureAuth, CommunityController.updatePost)
//admin-community
api.post('/community/:id/setAdmin', mdAuth.ensureAuth, CommunityController.setAdminCommunity);
api.get('/community/:id/quitAdmin', mdAuth.ensureAuth, CommunityController.quitAdminCommunity);
module.exports = api