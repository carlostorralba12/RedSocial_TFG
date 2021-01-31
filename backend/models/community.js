'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var communitySchema = Schema({
    name: String,
    description: String,
    symtoms: String,
    causes: String,
    treatment: String,
    other: String
});

module.exports = mongoose.model('Community', communitySchema);