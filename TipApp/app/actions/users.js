'use strict';

var reflux = require("reflux");
var merge  = require("merge");
var querystring = require("querystring");
var config = require("../config");
var db = require("../db.js");

var actions = reflux.createActions({
  'register': {children: ['completed', 'failed']},
  // 'login'
  // 'logout'
});

var base_url = config.Settings.BASE_URL + "/api";
var register_path = base_url + "/user/register/";

actions.register.listen(function(options) {
  var self = this;
  // first fetch to get nonce of registering user
  fetch(base_url + '/get_nonce/?controller=user&method=register', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then((responseJSON) => {
      // console.log(responseJSON);
      // second fetch to register user
      var register_params = merge(options, {'nonce': responseJSON.nonce})
      fetch(register_path + '?' + querystring.stringify(register_params), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
        .then((responseJSON) => {
          // console.log(responseJSON);
          // failed if response status is error
          if (responseJSON.status === 'error') { self.failed(responseJSON); }
          else {
            // write user name and password into local storage
            db.users.erase_db(function(removed_data){
              db.users.add(register_params, function(added_data){
                console.log(added_data);
                self.completed(added_data);
              });
            });
          }
        })
        .catch((error) => {
          console.error(error);
          self.failed(error);
        });
    })
    .catch((error) => {
      console.error(error);
      self.failed(error);
    })
});

module.exports = actions;