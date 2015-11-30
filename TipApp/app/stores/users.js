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
    this.trigger({action: 'register', return: 'ok', result: result});
  },

  onRegisterFailed: function(result) {
    console.log("Register failed - " + result);
    this.trigger({action: 'register', return: 'failed', result: result});
  },

  onLogin: function() {
    console.log("Logining ...");
  },

  onLoginCompleted: function(result) {
    console.log("Login completed - " + result);
    this.trigger({action: 'login', return: 'ok', result: result});
  },

  onLoginFailed: function(result) {
    console.log("Login failed - " + result);
    this.trigger({action: 'login', return: 'failed', result: result});
  },

  onLogout: function() {
    console.log("Logouting ...");
  },

  onLogoutCompleted: function(result) {
    console.log("Logout completed - " + result);
    this.trigger({action: 'logout', return: 'ok', result: result});
  },

  onLogoutFailed: function(result) {
    console.log("Logout failed - " + result);
    this.trigger({action: 'logout', return: 'failed', result: result});
  }
});

module.exports = store;