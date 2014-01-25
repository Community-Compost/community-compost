/**
 * Mongoose Schema for Blog Posts
 */

var db_config = require('../config/database');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection(db_config.server, db_config.database);

var blogSchema = new Schema({
    title: String,
    body: String,
    author: String,
    created: String
  });

module.exports = db.model('Blog', blogSchema);