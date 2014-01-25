/**
 * Script to automate creating test User Accounts
 */

User = require('../models/userSchema');
User_Profile = require('../models/userPropertiesSchema');

var test_user = require('./users.json').test_accounts;

User.findOne({'local.email': test_user['email']}, function(error, user) {
  if (error)
    return error;

  if (!user) {
    newUser = new User;

    newUser.local.email = test_user['email'];
    newUser.local.password = test_user['password'];

    newUser.save(function(error) {
    return newUser;
    });
  }
});

User_Profile.findOne({'name': test_user['properties']['name']}, function(error, user) {
  if (error)
    return error;

  if (!user) {
    User.findOne({'local.email': test_user['email']}, function(error, user) {
      if (error)
        return error;

      newProfile = new User_Profile;
      newProfile.auth_id = user.id;
      newProfile.name = test_user['properties']['name'];
      newProfile.role = test_user['properties']['role'];
      newProfile.bin_id = test_user['properties']['bin_id'];
      newProfile.address = test_user['properties']['address'];
      newProfile.zip_code = test_user['properties']['zip_code'];
      newProfile.residents = test_user['properties']['residents'];
      newProfile.weight = 0;

      newProfile.save(function(error) {
        if (error)
          return error

        return newProfile;
      });
    });
  }
});



