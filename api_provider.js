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

exports.API_Provider = API_Provider;