/**
 * Routing for USER pages (i.e. Profiles)
 */

var User_Management = require('../user_management').User_Management;
var user_management = new User_Management();

module.exports = function(app, passport, auth) {
  app.get('/:id/profile',  auth.requiresLogin, function(req, res) {
    
  });
};