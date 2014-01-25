/**
 * Routing for BLOG pages
 */

module.exports = function(app) {
  app.get('/blog', function(req, res) {
    res.render('blog', {title: 'Blog'});
  });

  app.get('/blog/id:', function(req, res) {
    res.render('blog', {title: 'Blog'});
  });

  app.get('/blog/new_post', function(req, res) {
    res.render('blog_new'. {title: 'New Post'});
  });
};