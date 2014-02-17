/**
 * Routing index
 */

module.exports = function(app, passport, auth) {
	app.get('/signup',function(req, res) {
		res.render('launchrock');
	});

	app.get('*', function(req, res) {
		res.redirect('/signup');
	});
};