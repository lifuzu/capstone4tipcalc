// SearchView.js

'use strict';

var React = require('react-native');
var {
  Component,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var routes = require('../routes');
var scene = require('../scene');

var PageOne = React.createClass({
  _handlePress() {
    this.props.navigator.push({id: 2,});
  },

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'green'}]}>
        <Text style={styles.welcome}>Greetings!</Text>
        <TouchableOpacity onPress={this._handlePress}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go to page two</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  },
});

var PageTwo = React.createClass({
  _handlePress() {
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'purple'}]}>
        <Text style={styles.welcome}>This is page two!</Text>
        <TouchableOpacity onPress={this._handlePress}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go back</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  },
});

var OrderListView = require('./OrderListView');
var ScanView = require('./ScanView');
var ItemDetailView = require('./ItemDetailView');

var OrderView = React.createClass({
  _renderScene(route, navigator) {
    if (route.id === 'list') {
      return <OrderListView navigator={navigator} />
    } else if (route.id === 'scan') {
      return <ScanView navigator={navigator} />
    } else if (route.id === 'detail') {
      if (route.params !== null) {
        return <ItemDetailView navigator={navigator} params={route.params}/>
      } else {
        return <ItemDetailView navigator={navigator} />
      }
    }
  },

  _configureScene(route) {
    if (route.renderConfig) {
      return route.sceneConfig;
    }
    return scene.CustomSceneConfig;
  },
  render() {
    return (
      <Navigator
        initialRoute = {{id: 'list', }}
        renderScene  = { this._renderScene }
        configureScene = {this._configureScene}/>
    );
  }
});

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
    color: 'white',
  },
});

module.exports = OrderView;