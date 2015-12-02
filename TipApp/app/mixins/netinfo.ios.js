// netinfo.js
'use strict';
var React = require('react-native');
var { Platform, NetInfo } = React;

var Netinfo = {

  getInitialState: function() {
    return {
      reachabilityHistory: [],
      reachability: null,
      isConnected: null,
    };
  },

  componentDidMount: function() {
    NetInfo.addEventListener(
      'change',
      this._handleReachabilityChange
    );
    NetInfo.fetch().done(
      (reachability) => { this.setState({reachability}); }
    );
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({isConnected}); }
    );
  },
  componentWillUnmount: function() {
    NetInfo.removeEventListener(
      'change',
      this._handleReachabilityChange
    );
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectivityChange
    );
  },
  _handleReachabilityChange: function(reachability) {
    var reachabilityHistory = this.state.reachabilityHistory.slice();
    reachabilityHistory.push(reachability);
    this.setState({
      reachabilityHistory,
      reachability,
    });
  },
  _handleConnectivityChange: function(isConnected) {
    this.setState({
      isConnected,
    });
  },
};

module.exports = Netinfo;