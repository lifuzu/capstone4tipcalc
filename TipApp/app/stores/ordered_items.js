// items.js
'use strict';

var reflux = require("reflux");
var actions = require("../actions/ordered_items");

var store = reflux.createStore({

  listenables: [actions],

  onList: function() {
    console.log("Listing ...");
  },

  onListCompleted: function(results) {
    console.log("List completed - ");
    // console.log(results)
    this.trigger(results);
  },

  onListFailed: function(result) {
    console.log("List failed - " + result);
    this.trigger(result);
  },

  onAddCompleted: function(results) {
    console.log("Add completed - ");
    console.log(results)
    this.trigger(results);
  },
});

module.exports = store;