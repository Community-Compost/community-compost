/**
 * Routing for MAIN pages (i.e. Home, Login, Signup)
 */

var User_Management = require('../user_management').User_Management;
var user_management = new User_Management();

/* Passport Middlware */

module.exports = function(app, passport, auth) {
  app.get('/', function(req, res) {
    res.render('index', {title: 'Home'});
  });

  app.get('/login', function(req, res) {
    res.render('login', {title: 'Login', message: req.flash('loginMessage')});
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/register', function(req, res) {
    res.render('register_start', {title: 'Register', message: req.flash('registerMessage')});
  });

  app.post('/register', passport.authenticate('local-register', {
      failureRedirect: '/register',
      failureFlash: true
    }), function(req, res) {
      res.redirect('/register/' + req.user.id);
  });

  app.get('/register/:id', function(req, res) {
    res.render('register_info', {title: 'Register', id: req.params.id, message: req.flash('registerMessage')});    
  });

  app.post('/register/:id', function(req, res) {
    var userProfile = {
      'auth_id': req.params.id,
      'name': req.body.name,
      'address': req.body.address,
      'zip_code': req.body.zip_code,
      'role': 'member',
      'residents': req.body.residents,
    }

    user_management.createUserProfile(userProfile, function(error, data){
      if (error)
        res.send("Unable to create User Profile");

      res.redirect('/register/' + req.params.id + '/subscribe');
    });
  });

  app.get('/register/:id/subscribe', function(req, res) {
    res.render('register_subscribe');
  });

  app.post('/register/:id/subscribe', function(req, res) {
    res.redirect('/registration_complete');
  });

  app.get('/registration_complete', function(req, res) {
    res.render('register_complete');
  });

  app.get('/locked', auth.requiresLogin, function(req, res) {
    
    user_management.checkRole(req.user.id, "admin", function(error, data) {
      if (data)
        res.send('Youre in!');
      else
        res.send('locked');
    });
  });
};