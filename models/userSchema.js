/**
 * Mongoose Schema for Users
 */

var db_config = require('../config/database');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection(db_config.server, db_config.database);