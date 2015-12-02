// ConversationView.js

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var GiftedMessenger = require('react-native-gifted-messenger');
var {Dimensions} = React;

var ConversationView = React.createClass({
  getInitialMessages() {
    return [
      {text: 'Are you building a chat app?', name: 'React-Native', image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
    ];
  },
  handleSend(message = {}, rowID = null) {
    // Send message.text to your server
  },
  handleReceive() {
    this._GiftedMessenger.appendMessage({
      text: 'Received message', 
      name: 'Friend', 
      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, 
      position: 'left', 
      date: new Date(),
    });
  },
  render() {
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}

        initialMessages={this.getInitialMessages()}
        handleSend={this.handleSend}
        maxHeight={Dimensions.get('window').height - 64} // 64 for the navBar

        styles={{
          bubbleLeft: {
            backgroundColor: '#e6e6eb',
            marginRight: 70,
          },
          bubbleRight: {
            backgroundColor: '#007aff',
            marginLeft: 70,
          },
        }}/>
    );
  },
});

module.exports = ConversationView;