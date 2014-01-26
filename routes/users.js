/**
 * Routing for USER pages (i.e. Profiles)
 */

var User_Management = require('../user_management').User_Management;
var user_management = new User_Management();

module.exports = function(app, passport, auth) {
  app.get('/:id/profile',  auth.requiresLogin, function(req, res) {
    
    user_management.getAllAttributes(req.user.id, function(error, data) {
      if (error)
        res.send('Everything broke');
      console.log(data)
      res.render('member_profile', {title: 'Profile', name: data[0].name, weight: data[0].weight, loggedin: req.isAuthenticated()});
    })
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};