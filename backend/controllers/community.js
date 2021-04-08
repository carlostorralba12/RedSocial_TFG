'use strict'

const Community = require('../models/community');

function inicializeCommunity(com){
    var community = new Community();
    community.name = com.name;
    community.descripcion = com.descripcion;
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

module.exports = {
    saveCommunity,
    deleteCommunity,
    getCommunity,
    updateCommunity,
    getCommunities
}