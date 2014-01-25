/**
 * Config bits for Passport Auth
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

/* Models */
var User = require('../models/userSchema');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(error, user) {
      done(error, user);
    });
  });

  /**
   * Local Register
   */
  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({'local.email': email}, function(error, user){
      if (error)
        return done(error);

      // Is that name taken?
      if (user) {
        return done(null, false, req.flash('registerMessage', 'That e-mail is already in use!'));

      } else {

        var newUser = new User;

        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        // Save
        newUser.save(function(error) {
          if (error)
            throw error;

          return done(null, newUser);
        });
      }
    });
  }));

  /**
   * Local Login
   */
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {

    User.findOne({'local.email': email}, function(error, user) {
      if (error)
        return done(error);

      // If User doesn't exist or password is incorrect.
      if(!user || !user.validPassword(password))
          return done(null, false, req.flash('loginMessage', "Incorrect User e-mail or password."));

      // Success!
      return done(null, user);
    });
  }));
};