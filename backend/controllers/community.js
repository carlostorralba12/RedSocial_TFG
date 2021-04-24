'use strict'

const Community = require('../models/community');

//COMMUNITIES

function inicializeCommunity(com){
    var community = new Community();
    community.name = com.name;
    community.orphaCode = com.orphaCode;
    community.description = com.description;
    community.symtoms = com.symtoms;
    community.causes = com.causes;
    community.treatment = com.treatment;
    community.other = com.other;
    return community;
}
function saveCommunity(req, res){
    var community = inicializeCommunity(req.body);
    
    Community.find({name: community.name}).exec((err, communities) => {
        if(err) return res.status(500).send({message: 'Error al guardar una comunidad'});

        if(communities && communities.length >= 1){
            return res.status(200).send({message: 'El nombre de la comunidad ya existe'});
        }
        
        community.save((err, communitySave) => {
            if(err) return res.status(500).send({message: 'Error al guardar una comunidad'});
            if(communitySave){
                return res.status(200).send({community: communitySave});
            }

        });
    });
}

function updateCommunity(req, res){
    var id = req.params.id;
    var communityRequest = req.body;
    Community.find({name: communityRequest.name}).exec((err, communities) => {
        if(err) return res.status(500).send({message: 'Error al guardar una comunidad'});

        if(communities && communities.length >= 1){
            if(communities[0].name == communityRequest.name && id != communities[0]._id){
                return res.status(200).send({message: 'El nombre de la comunidad ya existe'});
            }
                      
        }
        Community.findByIdAndUpdate(id, communityRequest, {new: true} ,(err, communityUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar una comunidad'});
            if(communityUpdated){
                return res.status(200).send({community: communityUpdated});
            }
        });
    });
}

function deleteCommunity(req, res){
    var communityId = req.params.id;
    
    Community.findByIdAndDelete(communityId, (err, communityDeleted) => {
        if(err){
            return res.status(500).send({message: 'Error en la petición'});
        }else {
            return res.status(200).send({community: communityDeleted});
        }
    });
  
}


function getCommunity(req,res){
    var communityId = req.params.id;

    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});
        return res.status(200).send({community: community});
    });
}

function getCommunities(req, res){
    Community.find((err, communities) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidades'});
        if(communities){
            return res.status(200).send({communities: communities});
        }
        else {
            return res.status(200).send({message: 'No hay comunidades aún'});
        }
    })
}

//DISCUSSIONS

function addDiscussion(req, res){
    var communityId = req.params.id;
    var discussion = req.body;

    //controlar discussiones repetidas
    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});
        community.discussions.push(discussion);

        Community.findByIdAndUpdate(communityId, community, {new: true} ,(err, communityUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar una comunidad'});
            if(communityUpdated){
                const discussionSend = communityUpdated.discussions.find(discussionItem => discussionItem.title == discussion.title);
                return res.status(200).send({discussion: discussionSend});
            }
        });
    });
}

function deleteDiscussion(req, res){
    var communityId = req.params.idCom;
    var discussionId = req.params.idDis;

    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});
        community.discussions.remove(discussionId);
        Community.findByIdAndUpdate(communityId, community, {new: true} ,(err, communityUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar una comunidad'});
            if(communityUpdated){
                return res.status(200).send({discussions: communityUpdated.discussions});
            }
        });
    });
}

function updateDiscussion(req, res){
    var communityId = req.params.idCom;
    var discussionId = req.params.idDis;

    var discussion = req.body;

    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});
        for(var i in community.discussions){
            if(community.discussions[i]._id ==  discussionId){
                community.discussions[i].title = discussion.title;
                community.discussions[i].description = discussion.description;
            }
        }

        Community.findByIdAndUpdate(communityId, community, {new: true} ,(err, communityUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar una comunidad'});
            if(communityUpdated){
                const discussionSend = communityUpdated.discussions.find(discussionItem => discussionItem._id == discussionId);
                return res.status(200).send({discussion: discussionSend});
            }
        });
    });
}

function getDiscussion(req, res){
    var communityId = req.params.idCom;
    var discussionId = req.params.idDis;

    //controlar discussiones repetidas
    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});
        const discussion = community.discussions.find(discussionItem => discussionItem._id == discussionId);
        return res.status(200).send({discussion: discussion});

    });

}

function getDiscussions(req, res){
    var communityId = req.params.idCom;

    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});
        return res.status(200).send({discussions: community.discussions});

    });

}

// POSTS
function addPost(req, res){
    var communityId = req.params.idCom;
    var discussionId = req.params.idDis;

    var post = req.body;
    //controlar discussiones repetidas
    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});
        var discussion = community.discussions.find(discussionItem => discussionItem._id == discussionId);
        //return res.status(200).send({discussion: discussion});

        for(var i in community.discussions){
            if(community.discussions[i]._id ==  discussion._id){
                community.discussions[i].posts.push(post);
            }
        }
        Community.findByIdAndUpdate(communityId, community, {new: true} ,(err, communityUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar una comunidad'});
            if(communityUpdated){
                const discussionSend = communityUpdated.discussions.find(discussionItem => discussionItem.title == discussion.title);
                return res.status(200).send({post: discussionSend.posts});
            }
        });

    });
}


function deletePost(req, res){
    var communityId = req.params.idCom;
    var discussionId = req.params.idDis;
    var postId = req.params.idPost;

    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});

        var discussion = community.discussions.find(discussionItem => discussionItem._id == discussionId);

        for(var i in community.discussions){
            if(community.discussions[i]._id ==  discussion._id){
                community.discussions[i].posts.remove(postId);
            }
        }
        Community.findByIdAndUpdate(communityId, community, {new: true} ,(err, communityUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar una comunidad'});
            if(communityUpdated){
                return res.status(200).send({posts: discussion.posts});
            }
        });
    });
}

function updatePost(req, res){
    var communityId = req.params.idCom;
    var discussionId = req.params.idDis;
    var postId = req.params.idPost;

    var post = req.body;
    var postUpdated;
    Community.findById(communityId, (err, community) => {
        if(err) return res.status(500).send({message: 'Error al obtener comunidad'});

        var discussion = community.discussions.find(discussionItem => discussionItem._id == discussionId);

        for(var i in community.discussions){
            if(community.discussions[i]._id ==  discussion._id){
                for(var j in community.discussions[i].posts){
                    if(community.discussions[i].posts[j]._id == postId){
                        community.discussions[i].posts[j].body = post.body;
                        postUpdated = community.discussions[i].posts[j];
                    }
                }
            }
        }
        Community.findByIdAndUpdate(communityId, community, {new: true} ,(err, communityUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar una comunidad'});
            if(communityUpdated){
                return res.status(200).send({post: postUpdated});
            }
        });
    });
}


module.exports = {
    saveCommunity,
    deleteCommunity,
    getCommunity,
    updateCommunity,
    getCommunities,
    addDiscussion,
    deleteDiscussion,
    updateDiscussion,
    getDiscussion,
    getDiscussions,
    addPost,
    deletePost,
    updatePost
}