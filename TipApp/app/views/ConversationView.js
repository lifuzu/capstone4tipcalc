// ConversationView.js

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  Dimensions,
  Platform,
  View,
  Text,
  TextInput,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var GiftedMessenger = require('react-native-gifted-messenger');
var { Icon, } = require('react-native-icons');

var ConversationView = React.createClass({
  getInitialMessages() {
    return [
      {text: 'Are you building a food order app?', name: 'ABC Restaurant', image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, position: 'left', date: new Date(2015, 10, 16, 19, 0)},
      {text: "Yes, and I use Fast Order!", name: 'Developer', image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, position: 'right', date: new Date(2015, 10, 17, 19, 0)},
    ];
  },
  handleSend(message = {}, rowID = null) {
    // TODO: Send message.text to your server
    // this._GiftedMessenger.setMessageStatus('Sent', rowID);
  },
  handleReceive() {
    this._GiftedMessenger.appendMessage({
      text: 'Received message',
      name: 'Developer',
      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
      position: 'left',
      date: new Date(),
    });
  },
  render() {
    return (
      <Navigator
        renderScene={this._renderScene}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
            routeMapper={NavigationBarRouteMapper} />
        } />
    );
  },
  _renderScene() {
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}

        initialMessages={this.getInitialMessages()}
        handleSend={this.handleSend}
        maxHeight={Dimensions.get('window').height - 64 - 30} // 64 for the navBar
        // maxHeight={Dimensions.get('window').height - navBarHeight - statusBarHeight}

        styles={{
          bubbleLeft: {
            backgroundColor: '#e6e6eb',
            marginRight: 70,
          },
          bubbleRight: {
            backgroundColor: '#007aff',
            marginLeft: 70,
          },
        }}
        inverted={true} />
    );
  },
});

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Icon
          name='ion|ios-arrow-back'
          size={40}
          color='#887700'
          style={{width: 40, height: 40}} />
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, nextState) {
    return null;
  },
  Title(route, navigator, index, nextState) {
    return (
      <Text style={{color: 'white', margin: 10, fontSize: 16}}>
        Conversations
      </Text>
    );
  }
};

var navBarHeight = (Platform.OS === 'android' ? 56 : 64);
// warning: height of android statusbar depends of the resolution of the device
// http://stackoverflow.com/questions/3407256/height-of-status-bar-in-android
var statusBarHeight = (Platform.OS === 'android' ? 25 : 0);

module.exports = ConversationView;