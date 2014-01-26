function reportError(msg) {
  $('#payment-errors').text(msg).addClass('alert alert-error');
  $('#submitBtn').prop('disabled', false);
  return false;
}

$(document).ready(function() {

  // Catch submit
  $('#subscribe-form').submit(function(event) {
    event.preventDefault();
    $('#subscribe-button').attr('disabled', 'disabled');

    // Parse form data
    var error = false;

    var ccNum = $('#card-number').val();
    var cvcNum = $('#card-cvc').val();
    var expDate = $('#card-expir-date').val().split("/");
    var amount = $('#cc-amount').val();

    console.log("CCNum: " + ccNum);
    console.log("CVCNum: " + cvcNum);

    // Validate card number
    if (!Stripe.validateCardNumber(ccNum)) {
      error = true;
      console.log("Card number invalid")
      reportError('The credit card number appears to be invalid.'); 
    }

    // Validate the CVC:
    if (!Stripe.validateCVC(cvcNum)) {
      error = true;
      console.log("CVC invalid.")
      reportError('The CVC number appears to be invalid.');
    }

    console.log(expDate);
    // Validate the expiration:
    if (!Stripe.validateExpiry(expDate[0], expDate[1])) {
      error = true;
      console.log('the Date is invalid');
      reportError('The expiration date appears to be invalid.');
    }

    if (!error) {
      // Get the Stripe token:
      Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expDate[0],
          exp_year: expDate[1]
      }, amount, stripeResponseHandler);
     } else {
      return false;
     }

  });
});
function stripeResponseHandler(status, response) {
  
  // Check for an error:
  if (response.error) {

    reportError(response.error.message);
    
  } else { 

    var f = $("#subscribe-form");
    var token = response['id'];

    f.append("<input type='hidden' name='stripeToken' value='" + token + "' />");
    f.get(0).submit();
  } 
}