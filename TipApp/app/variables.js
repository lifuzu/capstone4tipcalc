// config.js

'use strict';

var React = require('react-native');
var {
  Dimensions,
} = React;

module.exports = Object.assign({}, {
  SCREEN_WIDTH : Dimensions.get('window').width,
  NAV_BAR_HEIGHT : 44,
  STATUS_BAR_HEIGHT : 20,
  NAV_HEIGHT : 64, //NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,
});