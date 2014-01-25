/**
 * Routing index
 */

module.exports = function(app, passport) {
  require('./main')(app, passport);
  require('./blog')(app);
};