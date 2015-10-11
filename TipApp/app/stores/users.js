'use strict';

var reflux = require("reflux");
var actions = require("../actions/users");

var store = reflux.createStore({

  listenables: [actions],

  onRegister: function() {
    console.log("Registering ...");
  },

  onRegisterCompleted: function(result) {
    console.log("Register completed - " + result);
    this.trigger(result);
  },

  onRegisterFailed: function(result) {
    console.log("Register failed - " + result);
    this.trigger(result);
  }
});

module.exports = store;