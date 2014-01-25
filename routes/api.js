/**
 * Routing for API pages
 */

var API_Provider = require('../api_provider').API_Provider;
var api_provider = new API_Provider();


module.exports = function(app) {

  app.get('/api/:id', function(req, res) {

    api_provider.getUserInfo(req.params.id, function(error, data) {
      if (error)
        res.send("Unable to Retrieve.");

      res.send(data);
    });
  });

  app.post('/api/:id', function(req, res) {
    
  });
};
