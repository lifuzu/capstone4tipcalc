// config.js

'use strict';

var React = require('react-native');
var {
  Dimensions,
} = React;

var invariant = require('invariant');

var _constant = Object.assign({}, {
  SCREEN_WIDTH : Dimensions.get('window').width,
  NAV_BAR_HEIGHT : 44,
  STATUS_BAR_HEIGHT : 20,
  NAV_HEIGHT : 64, //NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,

  // https://github.com/taskrabbit/ReactNativeSampleApp/blob/master/App/Lib/CSSVarConfig.js
  gray90: '#323A3B',
  gray50: '#828A8B',
  gray30: '#B4B9B9',
  gray20: '#CFD2D3',
  gray10: '#EBECEC',
  gray5:  '#F5F6F6',

  blue50: '#23B4D2',

  // http://iosfonts.com/
  fontRegular: "HelveticaNeue",
  fontIcon: "HelveticaNeue", // TODO: get an icon font and include
});

var constant = function(/*string*/ key) /*string*/ {
  invariant(_constant[key], 'invalid variable ' + key);

  return _constant[key];
};

module.exports = constant;