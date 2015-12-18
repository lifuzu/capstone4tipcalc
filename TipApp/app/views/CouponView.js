// ConversationView.js

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  Dimensions,
  Platform,
  ListView,
  View,
  Text,
  TextInput,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var styles = require('../styles');
var { Icon, } = require('react-native-icons');
var CouponCell = require('./components/CouponCell');

var CouponView = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },
  componentDidMount: function() {
    var records = [
      {message: "Welcome to use coupon!", price: "$10.00", expire: "Feb. 4th, 2016", host: "ABC Restaurant", date: "2015/12/23"},
      {message: "Coupon please!", price: "$15.00", expire: "Feb. 10th, 2016", host: "Caffin Shop", date: "2015/12/25"}
    ];
    this.fetchData(records);
  },
  fetchData: function(records) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(records),
      loaded: true
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
    if(!this.state.loaded){
      return(
        <View style={[styles.container, stylesLocal.container]}>
          <Text style={[styles.loadingText, stylesLocal.loadingText]}>
            Fetching Coupons ...
          </Text>
        </View>
      );
    }
    return (
      <View style={[styles.container, stylesLocal.container]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderCoupon}
          style={stylesLocal.listView}/>
      </View>
    );
  },
  _renderCoupon(coupon) {
    return(
      <CouponCell
        onSelect={() => this.selectCoupon(coupon)}
        coupon={coupon}/>
    );
  }
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
        Coupon
      </Text>
    );
  }
};

var navBarHeight = (Platform.OS === 'android' ? 56 : 64);
// warning: height of android statusbar depends of the resolution of the device
// http://stackoverflow.com/questions/3407256/height-of-status-bar-in-android
var statusBarHeight = (Platform.OS === 'android' ? 25 : 0);

var stylesLocal = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    paddingTop: 65
  },
  loadingText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    color: '#FF6600'
  },
  listView:{
    backgroundColor: '#F6F6EF',
  },
});

module.exports = CouponView;