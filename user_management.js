/**
 * Function to manage user attributes
 */

/* Models */
var User_Properties = require('./models/userPropertiesSchema');

User_Management = function() {};

/**
 * Create new User for User Properties
 * @param {Object} userInfo - Intial User Settings
 */
 User_Management.prototype.createUserProfile = function(userInfo, done) {

  var newUserProfile = new User_Properties({
    auth_id: userInfo.auth_id,
    name: userInfo.name,
    role: userInfo.role,
    address: userInfo.address,
    zip_code: userInfo.zip_code,
    residents: userInfo.residents
  });

  newUserProfile.save(function(error) {
    if (error)
      throw error;

    return done(null, newUserProfile);
  });
 };

/**
 * Function to return all user Attributes
 * @param {Number} id - id of targeted user.
 */
User_Management.prototype.getAllAttributes = function(id, callback) {

  User_Properties.find({auth_id: id}, function(error, data) {
    if (error)
      callback(true, "Unable to get User Attributes");

    callback(null, data);
  });
};

/**
 * Check if user has correct access
 * @param {Number} id - Targed User
 * @param {String} reqRole - The required roll
 */
User_Management.prototype.checkRole = function(id, reqRole, callback) {

  User_Properties.findOne({auth_id: id}, function(error, data) {
    if (error)
      callback(true, "Unable to check user role")

    if (data.role == reqRole) {
      callback(null, true);
    } else {
      callback(null, false)
    }
  });
};

/**
 * Function get a specific attribute
 */
User_Management.prototype.getAttribute = function(attr, callback) {


};

/**
 * Set an Attribute
 */
User_Management.prototype.setAttributes = function(attr, callback) {};

exports.User_Management = User_Management;