'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;
var { Icon, } = require('react-native-icons');

var styles = require("../../styles");
var reflux = require("reflux");

var CouponCell = React.createClass({
  getInitialState: function() {
    return {
    };
  },
        // <TouchableHighlight onPress={this.props.onSelect}>
  render: function() {
    return (
      <View>
        <View style={[stylesLocal.container]}>
          <View style={{borderWidth: 0}}>
            <Text style={stylesLocal.digest}>
              "{this.props.coupon.message} {this.props.coupon.price} until {this.props.coupon.expire}"
            </Text>
            <Text style={[stylesLocal.author]}>
              By {this.props.coupon.host} @ {this.props.coupon.date}
            </Text>
          </View>
        </View>
      </View>
    );
  }
});

var stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  message: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 5,
    marginRight: 5,
    color: 'blue'
  },
  digest: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 5,
    marginRight: 5,
    color: '#FF6600',
    // borderWidth: 1
  },
  author: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 5,
    color: 'grey',
  },
  separator: {
    // marginTop: 2
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
  },
  fav: {
    width: 40,
    height: 40,
    // margin: 5
    // borderWidth: 1
  },
  comment: {
    width: 40,
    height: 40,
    // margin: 5
    // borderWidth: 1
  },
  share: {
    width: 40,
    height: 40,
    // margin: 5
    // borderWidth: 1
  },
  more: {
    width: 40,
    height: 40,
    // margin: 5
    // borderWidth: 1
  },
});

module.exports = CouponCell;