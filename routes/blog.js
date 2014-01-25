/**
 * Routing for BLOG pages
 */

var Blog_Provider = require('../blog_provider').Blog_Provider;
var blog_provider = new Blog_Provider();

module.exports = function(app) {
  app.get('/blog', function(req, res) {

    blog_provider.getAllPosts(function(error, data) {
      console.log(data);
      res.render('blog', {title: 'Blog', posts: data});
    });
  });

  app.get('/blog/:id', function(req, res) {

    blog_provider.getPostById(req.params.id, function(error, data) {
      if (error)
        res.send("Unable to load post.")

      res.render('blog_each', {title: data.title, body: data.body});
    });
  });

  app.get('/blog/new_post', function(req, res) {
    res.render('blog_new', {title: 'New Post'});
  });

  app.post('/blog/new_post', function(req, res) {

    var post = { 'title': req.body.title, 'content': req.body.post_body };

    blog_provider.addNewPost(post, function(error, data) {
      if (error)
        res.send("Adding new Blog Broke!");

      res.redirect('/blog')
    });
  });
};