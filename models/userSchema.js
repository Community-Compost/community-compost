/**
 * Mongoose Schema for Users
 */

var db_config = require('../config/database');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var db = mongoose.createConnection(db_config.server, db_config.database);

var userSchema = new Schema({
  local: {
    email: String,
    password: String
  },
  role: String,
  bin_id: Number
});

/**
 * Generate a Password Hash.
 * @param {String} password - The password to hash
 */
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Compare entered password against hashed password
 * @param {String} password - The password to hash
 */
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = db.model('User', userSchema);