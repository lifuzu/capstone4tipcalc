// applink.js
'use strict';
var React = require('react-native');
var { LinkingIOS, } = React;
var querystring = require('querystring');

var Applink = {
  getInitialState: function() {
    return {
      path: null,
      params: null,
    };
  },

  componentDidMount: function() {
    var url = LinkingIOS.popInitialURL();
    if (url) {
      this._processURL({url});
    }

    LinkingIOS.addEventListener('url', this._processURL);
  },
  componentWillUnmount: function() {
    LinkingIOS.removeEventListener('url', this._processURL);
  },
  _processURL: function(e) {
    console.log(e.url);
    var url = e.url.replace('tipapp://', '').split('?');
    var path = url[0];
    var params = url[1] ? querystring.parse(url[1]) : null;

    this.setState({
      path,
      params
    });
    // do something here based on `path` and `params`
    console.log(path);
    console.log(params);
  },

};

module.exports = Applink;