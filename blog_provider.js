/**
 * GET articles from the blog database, insert new posts/
 */

/* Models */
var Blog_Post = require('./models/blogSchema');

Blog_Provider = function() {};

/**
 * Return all Blog Posts
 */
Blog_Provider.prototype.getAllPosts = function(callback) {

  Blog_Post.find({}, function(error, data) {
    if (error)
      callback(true, "Unable to get posts.");

    callback(null, data);
  });
};

/**
 * Get a specific post using an id
 * @param {Number} id - Post ID
 */
Blog_Provider.prototype.getPostById = function(id, callback) {

  Blog_Post.findById(id, function(error, data) {
    if (error)
      callback(true, "Unable to get post.");

    callback(null, data);
  });
};

/**
 * Add new Blog Post
 * @param {String} post - Post attributes to add
 */
Blog_Provider.prototype.addNewPost = function(post, done) {

  var newPost = new Blog_Post({title: post.title, body: post.content});
  newPost.save(function(error) {
    if (error)
      throw error;

    return done(null, newPost);
  });
};

exports.Blog_Provider = Blog_Provider;