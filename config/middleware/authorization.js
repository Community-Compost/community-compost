/**
 * Middlware to handle authorization
 */

/**
 * A generic redirect to login if user is not logged
 */
exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next();
};