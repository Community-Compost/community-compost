/**
 * Routing for MAIN pages (i.e. Home, Login, Signup)
 */

module.exports = function(app, passport) {
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

  app.get('/register', function(req, res) {
    res.render('register', {title: 'Register', message: req.flash('registerMessage')});
  });

  app.post('/register', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
  }));
};