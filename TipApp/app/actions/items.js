// items.js
'use strict';

var reflux = require("reflux");
var merge  = require("merge");
var lodash = require("lodash");
var config = require("../config");
var db = require("../db.js");

var actions = reflux.createActions({
  'list': {children: ['completed', 'failed']},
  'find': {children: ['completed', 'failed']},
  'erase': {children: ['completed', 'failed']},
});

var base_url = config.Settings.BASE_URL + "/wp-json/posts";
var link_uri = config.Settings.BASE_URL + "/";

actions.list.listen(function(options) {
  var self = this;
  list_items(options, self.completed, self.failed);
});

actions.find.listen(function(options) {
  var self = this;
  find_item(options, self.completed, self.failed);
});

actions.erase.listen(function(options) {
  var self = this;
  erase_items(options, self.completed, self.failed);
});

// List items, cache into local storage
// TODO: input restaurant ID (in `options`) optionally, if not, list items in 10 miles
function list_items(options, completed, failed) {
  // console.log(restaurant_id);
  var list_items_path = base_url + "?type=fdm-menu-item";

  fetch(list_items_path, {
    method: 'GET',
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
        // Write items into local storage
        db.items.erase_db(function(removed_data){
          // console.log(removed_data);
          var added_items = [];
          for (var i = 0; i < responseJSON.length; i++) {
            var element = responseJSON[i];
            db.items.add( merge(element, {qrcode: element.link.replace(link_uri, '')}), function(added_data){
              // console.log(added_data);
              added_items.push(added_data);
              if (added_items.length === responseJSON.length) {
                console.log(added_items);
                completed(added_items);
              }
            });
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
      failed(error);
    })
}

// Erase all items from thelocal storage
function erase_items(options, completed, failed) {
  db.items.erase_db(function(removed_data){
    console.log(removed_data);
    completed(removed_data);
  });
}

// Find item, from thelocal storage, if not found, call list_items to sync with the remote server
// Input itemId (in `options`)
function find_item(options, completed, failed) {
  db.items.get({qrcode: options.itemId}, function(results){
    // console.log(results);
    if (results.length === 0) {
      list_items(options, function(added_items) {
        // console.log(added_items);
        var _item = lodash.find(added_items, {qrcode: options.itemId})
        // console.log('_item');
        // console.log(_item);
        if (!_item) {
          var error = 'Error: Not found the item!';
          console.error(error);
          failed(error);
        }
        else {
          // console.log(_item);
          completed(_item);
        }
      }, failed);
    } else {
      // it should be one only
      // console.log(results[0]);
      completed(results[0]);
    }
  });
}

module.exports = actions;