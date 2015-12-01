// yelp.js
'use strict';

var reflux = require("reflux");
var merge  = require("merge");
var lodash = require("lodash");
var config = require("../config");
var secure = require("../secure");
var db = require("../db.js");
var yelp = require("../utils/yelp");

var actions = reflux.createActions({
  'search': {children: ['completed', 'failed']},
});

var _options = {
  consumer_key: secure.Yelp.consumer_key,
  consumer_secret: secure.Yelp.consumer_secret,
  token: secure.Yelp.token,
  token_secret: secure.Yelp.token_secret,
};

actions.search.listen(function(options) {
  var self = this;
  search_items(options, self.completed, self.failed);
});

// Search items, cache into local storage
// Input term (in `options`) optionally, if not, search everything according to YELP search api
function search_items(options, completed, failed) {

  var parameters = {
    term: options.term,
    // ll: "37.788022,-122.399797",
    ll: "37.3248450,-121.9707580"
  };
  yelp.search(merge(_options, parameters), (data) => {
    console.log(data);
  }, (err) => {
    console.error(err);
  });
  // var search_items_path = search_uri + "?term=" + options.term + "&ll=37.788022,-122.399797";
  // fetch(search_items_path, {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   }
  // }).then((response) => response.json())
  //   .then((responseJSON) => {
  //     // console.log(responseJSON);
  //     // Failed if response status is error
  //     if (responseJSON.status === 'error') { failed(responseJSON); }
  //     else {
  //       console.log(responseJSON);
  //       // Write items into local storage
  //       // db.items.erase_db(function(removed_data){
  //       //   // console.log(removed_data);
  //       //   var added_items = [];
  //       //   for (var i = 0; i < responseJSON.length; i++) {
  //       //     var element = responseJSON[i];
  //       //     db.items.add( element, function(added_data){
  //       //       // console.log(added_data);
  //       //       added_items.push(added_data);
  //       //       if (added_items.length === responseJSON.length) {
  //       //         // console.log(added_items);
  //       //         completed(added_items);
  //       //       }
  //       //     });
  //       //   }
  //       // });
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     failed(error);
  //   })
}

// Erase all YELP_ITEMS from the local storage
function erase_items(options, completed, failed) {
  // db.items.erase_db(function(removed_data){
  //   console.log(removed_data);
  //   completed(removed_data);
  // });
}

module.exports = actions;