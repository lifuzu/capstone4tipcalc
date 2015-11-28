'use strict';

var reflux = require("reflux");
var merge  = require("merge");
var querystring = require("querystring");
var config = require("../config");
var db = require("../db.js");

var actions = reflux.createActions({
  'create': {children: ['completed', 'failed']},
});

var base_url = config.Settings.BASE_URL + "/api";

actions.create.listen(function(options) {
  var self = this;
  db.users.get_all(function(result){
    console.log(result);
    if (result.totalrows === 0) {
      console.log("Please login at first.");
      self.failed({"status": "error", "error": "Has not login yet."});
    } else {
      var user_info = result.rows[result.autoinc - 1];
      // if the result include auth cookie, go to create post directly; otherwise generating auth cookie at first
      if ( "cookie" in user_info ) {
        // push username into author, and cookie in options
        options = merge(options, {"author": user_info.username, "cookie": user_info.cookie});
        create_post(options, self.completed, self.failed);
      } else {
        // push user info into options
        options = merge(options, user_info);
        generate_auth_cookie(options, self.completed, self.failed);
      }
    }
  })
});

function generate_auth_cookie(options, completed, failed) {
  var generate_auth_cookie_path = base_url + "/user/generate_auth_cookie/";
  // first fetch to get nonce of generating auth cookie
  fetch(base_url + '/get_nonce/?controller=user&method=generate_auth_cookie', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      // second fetch to generate auth cookie
      var generate_auth_cookie_params = merge({'username': options.username, 'password': options.user_pass}, {'nonce': responseJSON.nonce});
      fetch(generate_auth_cookie_path + '?' + querystring.stringify(generate_auth_cookie_params), {
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
            // self.completed(responseJSON);
            console.log(responseJSON);
            var cookie = responseJSON.cookie_name + '=' + responseJSON.cookie
            db.users.update({'username': options.username}, {'cookie': cookie}, function(updated_table){
              create_post({title: options.title, content: options.content, author: options.username, cookie: cookie}, completed, failed);
            });
          }
        })
        .catch((error) => {
          console.error(error);
          failed(error);
        });
    })
    .catch((error) => {
      console.error(error);
      failed(error);
    })
}

function create_post(options, completed, failed) {
  var create_post_path = base_url + "/posts/create_post/";
  // fetch to get nonce of creating post
  fetch(base_url + '/get_nonce/?controller=posts&method=create_post', {
    method: 'GET',
    headers: {
      'Cookie': options.cookie,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then((responseJSON) => {
      // console.log(responseJSON);
      // then fetch to create post
      var create_post_params = merge({'title': options.title, 'content': options.content, 'author': options.author, 'status': 'publish'}, {'nonce': responseJSON.nonce})
      fetch(create_post_path + '?' + querystring.stringify(create_post_params), {
        method: 'GET',
        headers: {
          'Cookie': options.cookie,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
        .then((responseJSON) => {
          // console.log(responseJSON);
          // failed if response status is error
          if (responseJSON.status === 'error') { failed(responseJSON); }
          else {
            // console.log(responseJSON);
            completed(responseJSON);
          }
        })
        .catch((error) => {
          console.error(error);
          failed(error);
        });
    })
    .catch((error) => {
      console.error(error);
      failed(error);
    })
}

module.exports = actions;