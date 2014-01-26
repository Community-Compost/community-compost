/**
 * Routing for Stripe
 */

var stripe = require('stripe')('sk_test_MhgP9cmPEVrIdGmRN1JaXPql');

/* Model */
var User = require('../models/userSchema');

module.exports = function(app) {
  
  app.post('/register/:id/subscribe/basic', function(req, res) {

    User.findById(req.params.id, function(error, user) {
      console.log("card: " + req.body.stripeToken + ", email: " + user.local.email);
      stripe.customers.create({
        card: req.body.stripeToken,
        email: user.local.email,
        plan: "basic_plan"
      }, function(error, customer) {
        console.log(error);
        if (error)
          res.send("Error while processing payment");

        console.log(customer);
        var id = customer.id;
        console.log("Error while process " + id);
        res.send('ok');
      });
    });
  });
};