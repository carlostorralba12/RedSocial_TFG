'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var discussionSchema = Schema({
    title: Schema,
    description: String
});

module.exports = mongoose.model('Discussion', discussionSchema);