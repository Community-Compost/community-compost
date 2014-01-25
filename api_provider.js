/**
 * Supply information for the api.
 */

/* Models */
var User_Profile = require('./models/userPropertiesSchema');

API_Provider = function() {};

/**
 * Return user properties
 * @param {Number} bin_id - bin_id scanned from the app.
 */
API_Provider.prototype.getUserInfo = function(id, callback) {
  User_Profile.findOne({'bin_id': id}, function(error, data) {
    if (error)
      callback(true, "Unable to find User.");

    callback(null, data);
  });
};

/**
 * Take Post data from app, insert in database.
 * @param {Number} bin_id - bin_id scanned from app
 * @param {Number} weight - weight entered from app
 */
API_Provider.prototype.setWeight = function(id, weight, callback) {
  User_Profile.findOneAndUpdate({'bin_id': id,}, {$set: {"weight": weight}}, function(error, data) {
    
  });
};

exports.API_Provider = API_Provider;