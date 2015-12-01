// geolocation.js
'use strict';
var React = require('react-native');
var { Platform, } = React;

var Geolocation = {
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },

  componentDidMount: function() {
    // TODO: Support Android later to upgrade React Native to > v0.16.0
    // OR http://stackoverflow.com/questions/33341760/react-native-android-geolocation
    if (Platform.OS === 'ios') {
      navigator.geolocation.getCurrentPosition(
        (initialPosition) => this.setState({initialPosition}),
        (error) => console.error(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
        this.setState({lastPosition});
      });
    }
  },

  componentWillUnmount: function() {
    if (Platform.OS === 'ios') {
      navigator.geolocation.clearWatch(this.watchID);
    }
  },

};

module.exports = Geolocation;