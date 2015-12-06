// InformationView.js

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
var scene  = require('../scene');
var SimpleList   = require('./components/SimpleList');
var ConversationView = require('./ConversationView');

var Information = React.createClass({
  getInitialState: function() {
    return {
      items: [/*{
        title: "News",
        actionType: null,
        nextIcon: true,
      },*/{
        title: "Coupons",
        subtitle: "More coupons waiting here!",
        actionType: null,
        nextIcon: true,
      },{
        title: "Conversations",
        subtitle: "Welcome to conversation!",
        actionType: null,
        nextIcon: true,
        onSelection: this._createConversation,
      }/*,{
        title: "Friends",
        actionType: null,
        nextIcon: true,
      }*/]
    };
  },

  _createConversation: function() {
    this.props.navigator.push({id: 'conversation'});
  },

  render: function() {
    console.log("Information");
    return (
      <View style={styles.container}>
        <SimpleList items={this.state.items}/>
      </View>
    );
  },
});

var InformationView = React.createClass({
  _renderScene(route, navigator) {
    if (route.id === 'information') {
      return <Information navigator={navigator}/>
    } else if (route.id === 'conversation') {
      return <ConversationView navigator={navigator} />
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
        initialRoute = {{id: 'information', }}
        renderScene  = { this._renderScene }
        configureScene = {this._configureScene}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = InformationView;