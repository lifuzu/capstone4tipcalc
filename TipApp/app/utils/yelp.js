/* require the modules needed */
var oauthSignature = require('oauth-signature');
var n = require('./nonce')();
var qs = require('querystring');
var _ = require('lodash');

/* Function for yelp call
 * ------------------------
 * options: object with params to search, support 'term', 'location'
 * 'consumer_key', 'token', 'consumer_secret', 'token_secret'
 * completed: callback(responseJSON)
 * failed: callback(error)
 */
var yelp_search = function(options, completed, failed) {

  /* The type of request */
  var method = 'GET';

  /* The url we are using for the request */
  var _url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    term: 'food',
    // location: 'San+Francisco',
    sort: '2'
  };

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : options.consumer_key,
    oauth_token : options.token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  /* We combine all the parameters in order of importance */ 
  var parameters = _.assign(default_parameters, options, required_parameters);

  /* We set our secrets here */
  var consumerSecret = options.consumer_secret;
  var tokenSecret = options.token_secret;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(method, _url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = _url+'?'+paramURL;

  /* Then we use fetch to send make the API Request */
  fetch(apiURL, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then((responseJSON) => {
      // console.log(responseJSON);
      // Failed if response status is error
      if (responseJSON.status === 'error') { failed(responseJSON); }
      else {
        // console.log(responseJSON);
        completed(responseJSON);
      }
    })
    .catch((error) => {
      console.error(error);
      failed(error);
    })
};

module.exports = {
  search: yelp_search
};