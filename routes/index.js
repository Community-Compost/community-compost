/**
 * Routing index
 */

module.exports = function(app, passport, auth) {
  require('./main')(app, passport, auth);
  require('./blog')(app);
};