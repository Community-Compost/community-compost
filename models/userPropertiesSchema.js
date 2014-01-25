/**
 * Mongoose Schema for Users
 */

var db_config = require('../config/database');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection(db_config.server, db_config.database);

var userPropertiesSchema = new Schema({
  auth_id: String,
  role: String,
  bin_id: Number,
  name: String,
  address: String,
  zip_code: Number,
  residents: Number,
  weight: Number
});


module.exports = db.model('UserProfiles', userPropertiesSchema);
