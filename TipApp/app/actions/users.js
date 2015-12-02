'use strict';

var reflux = require("reflux");
var merge  = require("merge");
var querystring = require("querystring");
var config = require("../config");
var db = require("../db.js");

var actions = reflux.createActions({
  'register': {children: ['completed', 'failed']},
  'login'   : {children: ['completed', 'failed']},
  'logout'  : {children: ['completed', 'failed']},
  'status'  : {children: ['completed', 'failed']},
});

var base_url = config.Settings.BASE_URL + "/api";
var user_url = base_url + "/user";
var nonce_url = base_url + "/get_nonce/";
var register_path = user_url + "/register/";
var auth_cookie_path = user_url + "/generate_auth_cookie/";

// actions.status.listen(function(options) {});

actions.login.listen(function(options) {
  var self = this;
  login_user(options, self.completed, self.failed);
});

actions.logout.listen(function(options) {
  var self = this;
  var options = {};
  erase_users(options, self.completed, self.failed);
});

actions.status.listen(function() {
  var self = this;
  var options = {};
  detect_user(options, self.completed, self.failed);
});

// Register a new user with username, user_pass, email, and display_name
actions.register.listen(function(options) {
  var self = this;
  // first fetch to get nonce of registering user
  fetch(nonce_url + '?controller=user&method=register', {
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

// Login user with username, and password in options
function login_user(options, completed, failed) {
  get_nonce(options, completed, failed);
}

// Get nonce for generating auth cookie
function get_nonce(options, completed, failed) {
  fetch(nonce_url + '?controller=user&method=generate_auth_cookie', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then((responseJSON) => {
      // console.log(responseJSON);
      var auth_cookie_params = merge(options, {'nonce': responseJSON.nonce});
      get_auth_cookie(auth_cookie_params, completed, failed);
    })
    .catch((error) => {
      console.error(error);
      failed(error);
    })
}

// Get auth cookie, with `username`, `password` and `nonce` in options
function get_auth_cookie(options, completed, failed) {
  fetch(auth_cookie_path + '?' + querystring.stringify(options), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      // failed if response status is error
      if (responseJSON.status === 'error') { failed(responseJSON); }
      else {
        // write user name and password into local storage
        write_user(options, completed, failed);
      }
    })
    .catch((error) => {
      console.error(error);
      failed(error);
    });
}

// Write a user into the local storage
function write_user(options, completed, failed) {
  db.users.erase_db(function(removed_data){
    db.users.add(options, function(added_data){
      console.log(added_data);
      completed(added_data);
    });
  });
}

// Detect user login, or not
function detect_user(options, completed, failed) {
  db.users.get_all(function(result){
    console.log(result);
    completed(result);
  });
}

// Erase all users from the local storage
function erase_users(options, completed, failed) {
  db.users.erase_db(function(removed_data){
    // console.log(removed_data);
    completed(removed_data);
  });
}

module.exports = actions;