'use strict';

var React = require('react-native');
var {
  Image,
  LinkingIOS,
  ListView,
  MapView,
  ScrollView,
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
} = React;

var { Icon, } = require('react-native-icons');
var styles = require('../styles');
var NAV_HEIGHT = require('../variables')('NAV_HEIGHT');
var StarRating = require('react-native-star-rating');
var lodash = require('lodash');
var KVBox = require('./components/KVBox');
var FilledButton = require('./components/FilledButton');
var StarRating = require('react-native-star-rating');

class SearchItemView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: '',
      loaded: false,
    }
    this._renderScene = this._renderScene.bind(this);
    this.renderItemView = this.renderItemView.bind(this);
  }
  render() {
    return (
      <Navigator
        renderScene={(route, navigator) => this._renderScene(route, navigator)}
        navigator={this.props.navigator}
        title={this.state.item.name}
        navigationBar={
          <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
            routeMapper={NavigationBarRouteMapper} />
        } />
    );
  }
  _renderScene(route, navigator) {
    console.log(route);
    // console.log('_renderScene');
    if(!this.state.loaded){
      return(
        <View style={[styles.container, stylesLocal.container]}>
          <Text style={[styles.loadingText, stylesLocal.loadingText]}>
            Listing Items ...
          </Text>
        </View>
      );
    } else {
      return (
        this.renderItemView()
      );
    }
  }
  renderItemView(){
    var navigator_placeholder = <View style={{height: NAV_HEIGHT + 5}}></View>;
    var region = {
      latitude: this.state.item.location.coordinate.latitude,
      longitude: this.state.item.location.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    var mapPins = [];
    if (this.state.item.location.coordinate) {
      mapPins = [{
        latitude: this.state.item.location.coordinate.latitude,
        longitude: this.state.item.location.coordinate.longitude,
        title: this.state.item.name,
      }];
    }
    var kvElements = [];
    lodash.each(lodash.pick(this.state.item, ["name", "display_phone"]), function (item, key) {
      if (!key || !item) return;
      if (key === 'display_phone') key = 'contact';
      kvElements.push(
        <KVBox key={key} label={key.toUpperCase()} value={item} />
      );
    });
    kvElements.push(
      <KVBox key={'address'} label={'address'.toUpperCase()} value={this.state.item.location.display_address.join(', ')} />
    );
    var linkingMaps = "http://maps.apple.com/?daddr=" + this.state.item.location.coordinate.latitude + "," + this.state.item.location.coordinate.longitude;
    return(
      <ScrollView>
        {navigator_placeholder}
        <Image
          source={{uri: this.state.item.image_url}}
          style={stylesLocal.image}
          resizeMode={"contain"} />

        <View style={stylesLocal.descContainer}>
          <Text style={stylesLocal.descLabel}>REMARKS:</Text>
          <Text style={stylesLocal.descText}>
            {this.state.item.snippet_text}
          </Text>
        </View>

        <View style={stylesLocal.stars}>
          <StarRating
            maxStars={5}
            rating={this.state.item.rating}
            disabled={true}
            starSize={45} />
        </View>

        <View style={stylesLocal.kvContainer}>
          {kvElements}
        </View>

        <MapView
          style={stylesLocal.map}
          region={region}
          annotations={mapPins} />

        <FilledButton
          style={{marginTop:5, backgroundColor:'#0ea378'}}
          highlightedColor='#007655'
          title={"Direction"}
          titleStyle={{color:'white'}}
          onPress={() => LinkingIOS.openURL(linkingMaps)} />
      </ScrollView>
    );
  }
  componentDidMount() {
    this.setState({
      item: this.props.item,
      loaded: true
    });
  }
}

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
    console.log(route);
    return (
      <Text style={{color: 'white', margin: 10, fontSize: 16}}>
        {"Details"}
      </Text>
    );
  }
};

var stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  image: {
    backgroundColor: 'transparent',
    height: 200,
  },
  map: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  stars: {
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descContainer: {
  },
  descLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: "#666"
  },
  descText: {
    fontSize: 14,
    fontWeight: '200',
    color: "#666",
    lineHeight: 20
  },
  kvContainer: {
    paddingTop: 0,
  },
});

module.exports = SearchItemView;