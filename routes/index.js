/**
 * Routing index
 */

module.exports = function(app, passport, auth) {
  require('./main')(app, passport, auth);
  require('./blog')(app);
  require('./api')(app);
  require('./stripe')(app);
};