// ItemCell.js

'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;
var { Icon, } = require('react-native-icons');

var styles = require("../styles");
var SCREEN_WIDTH = require("../variables")('SCREEN_WIDTH');

var ItemCell = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  // <Image source={{uri: this.props.item.featured_image.source}} style={[stylesLocal.image, {alignItems: "center", resizeMode: 'contain'}]} />
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.props.onSelection}>
          <View style={[stylesLocal.item, {alignItems: "center"}]}>
            <Image source={{uri: this.props.item.featured_image.source}} style={[stylesLocal.image, {alignItems: "center", resizeMode: 'contain'}]} />
          </View>
        </TouchableHighlight>
        <Text style={{marginLeft: 5}}>{this.props.item.title}</Text>
        <Text style={{marginLeft: 5}}>x{this.props.item.count}</Text>
      </View>
    );
  }
});

var stylesLocal = StyleSheet.create({
  item: {
    backgroundColor: '#CCC',
    margin: 5,
    width: SCREEN_WIDTH / 2 - 20,
    height: SCREEN_WIDTH / 2 - 20
  },
  image: {
    backgroundColor: 'transparent',
    width: SCREEN_WIDTH / 2 - 20,
    height: SCREEN_WIDTH / 2 - 20,
  },
});

module.exports = ItemCell;