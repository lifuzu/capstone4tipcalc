'use strict';

var React = require('react-native')
var { StyleSheet, PixelRatio } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black'
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 65,
    backgroundColor: 'red'
  },
  // https://github.com/taskrabbit/ReactNativeSampleApp/blob/master/App/Lib/CSSVarConfig.js
  listLine: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(), // thinnest possible line
    marginLeft: 10,
  },
  listFullLine: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(), // thinnest possible line
    marginLeft: 0,
  }
})

module.exports = styles;