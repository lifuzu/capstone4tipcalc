// items.js
'use strict';

var reflux = require("reflux");
var merge  = require("merge");
var lodash = require("lodash");
var config = require("../config");
var db = require("../db.js");

var actions = reflux.createActions({
  'list': {children: ['completed', 'failed']},
  'add' : {children: ['completed', 'failed']},
  'del' : {children: ['completed', 'failed']},
  'erase' : {children: ['completed', 'failed']},
});

// var base_url = config.Settings.BASE_URL + "/wp-json/posts";

actions.list.listen(function(options) {
  var self = this;
  list_items(options, self.completed, self.failed);
});

actions.add.listen(function(options) {
  var self = this;
  add_item(options, self.completed, self.failed);
});

actions.del.listen(function(options) {
  var self = this;
  del_item(options, self.completed, self.failed);
});

actions.erase.listen(function(options) {
  var self = this;
  erase_items(options, self.completed, self.failed);
});

// List ordered items from local storage - ordered_items table
// TODO: input restaurant ID (in `options`) optionally, if not, list items in 10 miles
function list_items(options, completed, failed) {
  // console.log(restaurant_id);
  db.ordered_items.get_all(function(results){
    // console.log(results);
    completed(lodash.values(results.rows));
  });
}

// Add one item to the local storage. If existing, increment the count
// Input item (in `options`)
function add_item(options, completed, failed) {
  db.ordered_items.get({qrcode: options.item.qrcode}, function(results){
    // console.log(results);
    if (results.length === 0) {
      var _item = merge(options.item, {count: 1})
      db.ordered_items.add(_item, function(added_data){
        // console.log(added_data);
        // completed(added_data);
        db.ordered_items.get_all(function(results){
          // console.log(results);
          completed(lodash.values(results.rows));
        });
      });
    } else {
      var _count = results[0].count + 1;
      db.ordered_items.update({qrcode: options.item.qrcode}, {count: _count}, function(updated_table){
        // console.log(updated_table);
        db.ordered_items.get_all(function(results){
          // console.log(results);
          completed(lodash.values(results.rows));
        });
      });
    }
  });
}

// Delete one item, from the local storage. If existing multiple, decrement one
// Input itemId (in `options`)
function del_item(options, completed, failed) {
  db.ordered_items.get({qrcode: options.itemId}, function(results){
    // console.log(results);
    if (results.length) {
      if (results[0].count === 1) {
        db.ordered_items.remove({qrcode: options.itemId}, function(removed_data){
          // console.log(removed_data);
          completed(removed_data);
        });
      } else {
        var _count = results[0].count - 1;
        db.ordered_items.update({qrcode: options.itemId}, {count: _count}, function(updated_table){
          // console.log(updated_table);
          completed(removed_data);
        });
      }
    } else {
      completed();
    }
  });
}

// Erase all ordered items from the local storage
function erase_items(options, completed, failed) {
  db.ordered_items.erase_db(function(removed_data){
    // console.log(removed_data);
    completed(removed_data);
  });
}

module.exports = actions;