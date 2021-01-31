'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postSchema = Schema({
    body: String
});

module.exports = mongoose.model('Post', postSchema);