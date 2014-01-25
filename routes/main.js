/**
 * Routing for MAIN pages (i.e. Home, Login, Signup)
 */

module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', {title: 'Home'});
  });
};