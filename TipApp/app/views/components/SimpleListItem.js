// SimpleListItem.js

'use strict';
var React  = require('react-native');
var {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} = React;

var styles = require("../../styles");
var variables = require('../../variables');

var SimpleListItem = React.createClass({

  renderTitle: function() {
    if (!this.props.title) return null;

    return (
      <Text style={styles.title}>
        {this.props.title}
      </Text>
    );
  },

  renderSubtitle: function() {
    if (!this.props.subtitle) return null;

    return (
      <Text style={styles.subtitle}>
        {this.props.subtitle}
      </Text>
    );
  },

  renderRightIcon: function() {
    if (!this.props.nextIcon) return null;

    // caret-right-semi
    return (
      <Text style={styles.rightIcon}>></Text>
    );
  },

  renderContent: function() {
    return (
      <View style={[styles.row, this.props.noTap && styles.touch]}>
        <View style={styles.left}>
          {this.renderTitle()}
          {this.renderSubtitle()}
        </View>
        <View style={styles.right}>
          {this.renderRightIcon()}
        </View>
      </View>
    );
  },

  render: function() {
    if (this.props.noTap) {
      return this.renderContent();
    }

    return (
      <View>
        <TouchableHighlight
          style={styles.touch}
          underlayColor={variables('gray10')}
          onPress={this.props.onSelection}>
          {this.renderContent()}
        </TouchableHighlight>
        <View style={styles.listFullLine} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  touch: {
    backgroundColor: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding:20
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    paddingTop: 5,
    fontSize: 14,
    color: variables('gray20'),
  },
  left: {
    flex: 1,
  },
  right: {
    
  },
  rightIcon: {
    fontFamily: variables('fontIcon'),
    color: variables('gray30'),
    fontSize: 12,
  }
});

module.exports = SimpleListItem;