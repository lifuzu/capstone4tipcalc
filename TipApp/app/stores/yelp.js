// yelp.js
'use strict';

var reflux = require("reflux");
var actions = require("../actions/yelp");

var store = reflux.createStore({

  listenables: [actions],

  onSearch: function() {
    console.log("Searching ...");
  },

  onSearchCompleted: function(result) {
    console.log("Search completed - " + result);
    this.trigger(result);
  },

  onSearchFailed: function(result) {
    console.log("Search failed - " + result);
    this.trigger(result);
  }
});

module.exports = store;