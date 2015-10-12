'use strict';

var reflux = require("reflux");
var merge  = require("merge");
var querystring = require("querystring");
var config = require("../config");

var actions = reflux.createActions({
  'create': {children: ['completed', 'failed']},
});

var base_url = config.Settings.BASE_URL;
var generate_auth_cookie_path = base_url + "/user/generate_auth_cookie/";

actions.create.listen(function(options) {
  var self = this;
  // TODO: detect if auth cookie exists in local storage, otherwise, generating auth cookie
  // TODO: detect if user name and password exists in local storage, otherwise, require login

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
      var generate_auth_cookie_params = merge({'username': 'Q', 'password': 'w'} /*TODO*/, {'nonce': responseJSON.nonce})
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
          if (responseJSON.status === 'error') { self.failed(responseJSON); }
          else {
            // self.completed(responseJSON);
            console.log(responseJSON);
            create_post({title: options.title, content: options.content, author: 'Q', cookie: responseJSON.cookie_name + '=' + responseJSON.cookie}, self.completed, self.failed);
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