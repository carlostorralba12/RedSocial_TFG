'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var communitySchema = Schema({
    name: String,
    description: String,
    symtoms: String,
    causes: String,
    treatment: String,
    other: String,
    //Discussions
    discussions: [{
        title: String,
        description: String,
        //posts
        posts: [{
            body: String
        }]
    }]

});

module.exports = mongoose.model('Community', communitySchema);