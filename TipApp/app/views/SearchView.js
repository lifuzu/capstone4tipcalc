// SearchView.js

'use strict';

var React = require('react-native');
var {
  Component,
  Platform,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = React;

var routes = require('../routes');
var scene  = require('../scene');
var styles = require('../styles');
var { Icon, } = require('react-native-icons');
var Button = require('react-native-button');
var Toast = require('react-native-toast');
var yelpActions = require('../actions/yelp');
var yelpStore   = require('../stores/yelp');
var geolocation = require('../mixins/geolocation');
var netinfo = Platform.OS === 'ios' ? require('../mixins/netinfo') : {};
var userinfo = require('../mixins/userinfo');
var SearchListView = require('./SearchListView');

var Search = React.createClass({
  mixins: [geolocation, netinfo, userinfo],
  getInitialState() {
    return {
      text: "",
    };
  },
  _handleSearch() {
    if (this.state.initialPosition !== 'unknown') {
      var coords = this.state.initialPosition.coords;
      var loc = coords.latitude.toFixed(4) + ',' + coords.longitude.toFixed(4);
      yelpActions.search({term: this.state.text, ll: loc});
    } else {
      var loc = "37.788022,-122.399797";
      yelpActions.search({term: this.state.text, ll: loc});
    }
  },
// <View style={{paddingVertical: 4, paddingHorizontal: 5, backgroundColor: 'grey'}}>
  render() {
    return (
      <View style={[styles.container, stylesLocal.container]}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5}}
          onChangeText={(text) => this.setState({text})}
          autoFocus={true}
          clearButtonMode={"while-editing"}
          enablesReturnKeyAutomatically={true}
          returnKeyType={"go"}
          placeholder={"Please input here!"}
          value={this.state.text} />
        <Button onPress={this._handleSearch}>
          <Icon
            name='ion|ios-search'
            size={30}
            color='#887700'
            style={[styles.button, {width: 60, height: 40, marginTop: 10}]} />
        </Button>
      </View>
    )
  },
        // <Text>{JSON.stringify(this.state.reachabilityHistory)}</Text>
        // <Text>{this.state.reachability}</Text>
        // <Text>{this.state.isConnected ? 'Online' : 'Offline'}</Text>
        // <Text>{this.state.isLogin ? 'Login' : 'Logout'}</Text>
        // <Button onPress={Toast.showShortBottom.bind(null, "this is a message")}
        //   style={[styles.button, {marginTop: 10}]}>
        //   showShortBottom
        // </Button>
  componentDidMount() {
    this.unsubscribe = yelpStore.listen(this.onSearchDone);
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

var stylesLocal = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = SearchView;