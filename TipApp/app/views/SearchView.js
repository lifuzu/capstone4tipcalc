// SearchView.js

'use strict';

var React = require('react-native');
var {
  Component,
  Platform,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var routes = require('../routes');
var scene = require('../scene');
var yelpActions = require('../actions/yelp');
var yelpStore   = require('../stores/yelp');
var geolocation = require('../mixins/geolocation');
var netinfo = Platform.OS === 'ios' ? require('../mixins/netinfo') : {};
var userinfo = require('../mixins/userinfo');
var SearchListView = require('./SearchListView');

var Search = React.createClass({
  mixins: [geolocation, netinfo, userinfo],
  _handleSearch() {
    if (this.state.initialPosition !== 'unknown') {
      var coords = this.state.initialPosition.coords;
      var loc = coords.latitude.toFixed(4) + ',' + coords.longitude.toFixed(4);
      yelpActions.search({term: 'food', ll: loc});
    } else {
      var loc = "37.788022,-122.399797";
      yelpActions.search({term: 'food', ll: loc});
    }
  },

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'green'}]}>
        <Text style={styles.welcome}>Greetings!</Text>
        <TouchableOpacity onPress={this._handleSearch}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Search</Text>
          </View>
        </TouchableOpacity>
        <Text>{JSON.stringify(this.state.reachabilityHistory)}</Text>
        <Text>{this.state.reachability}</Text>
        <Text>{this.state.isConnected ? 'Online' : 'Offline'}</Text>
        <Text>{this.state.isLogin ? 'Login' : 'Logout'}</Text>
      </View>
    )
  },
  componentDidMount() {
    this.unsubscribe = yelpStore.listen(this.onSearchDone.bind(this));
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  onSearchDone(records) {
    this.props.navigator.push({id: 'list', items: records.businesses});
  },
});

        // <Text>
        //   <Text style={styles.title}>Initial position: </Text>
        //   {JSON.stringify(this.state.initialPosition)}
        // </Text>
        // <Text>
        //   <Text style={styles.title}>Current position: </Text>
        //   {JSON.stringify(this.state.lastPosition)}
        // </Text>

var SearchView = React.createClass({
  _renderScene(route, navigator) {
    if (route.id === 'search') {
      return <Search navigator={navigator} />
    } else if (route.id === 'list') {
      if (route.items !== null) {
        return <SearchListView navigator={navigator} items={route.items}/>
      } else {
        return <SearchListView navigator={navigator} />
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
        initialRoute = {{id: 'search', }}
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

module.exports = SearchView;