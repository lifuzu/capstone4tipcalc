// items.js
'use strict';

var reflux = require("reflux");
var actions = require("../actions/items");

var store = reflux.createStore({

  listenables: [actions],

  onFind: function() {
    console.log("Finding ...");
  },

  onFindCompleted: function(result) {
    // console.log("Find completed - " + result);
    this.trigger(result);
  },

  onFindFailed: function(result) {
    console.log("Find failed - " + result);
    this.trigger(result);
  }
});

module.exports = store;