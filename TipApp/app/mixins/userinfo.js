// userinfo.js

'use strict';
var React = require('react-native');
// var { Platform, } = React;

var usersActions = require('../actions/users');
var usersStores = require('../stores/users');

var Userinfo = {

  getInitialState: function() {
    return {
      isLogin: false,
    };
  },

  componentDidMount: function() {
    this.unsubscribe = usersStores.listen(this.onUserStatus);
    usersActions.status();
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  onUserStatus: function(status) {
    // console.log(status);
    if (status.return === 'login') {
      this.setState({isLogin: true});
    } else {
      this.setState({isLogin: false});
    }
  },
};

module.exports = Userinfo;