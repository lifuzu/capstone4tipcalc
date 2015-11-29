'use strict';

var React = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Component,
  Image,
  View,
  Text,
  Navigator,
  TouchableOpacity,
} = React;

var Button = require('react-native-button');
var { Icon, } = require('react-native-icons');
var variables = require('../variables');
var itemsActions = require('../actions/items');
var itemsStores = require('../stores/items');
var orderedItemsActions = require('../actions/ordered_items');

class ItemDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
    }
  }
  render() {
    // console.log(this.props.params);
    return (
      <Navigator
        renderScene={this._renderScene.bind(this)}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
            routeMapper={NavigationBarRouteMapper} />
        } />
    );
  }
  _renderScene(route, navigator) {
    var image_display = this.state.item && this.state.item.featured_image ?
      <Image source={{uri: this.state.item.featured_image.source}} style={[styles.image, {overflow: 'visible'}]} /> : null;
    var navigator_placeholder = <View style={{height: variables.NAV_HEIGHT}}></View>;
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        {navigator_placeholder}
        {image_display}
        <Text>{this.state.item.title}</Text>
        <Text>{this.state.item.content}</Text>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={this._onSubmit.bind(this)}>
          Confirm!
        </Button>
      </ScrollView>
    );
  }
  _onSubmit() {
    // this.props.navigator.push({
    //   id: 'scan',
    //   // sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    // });
    // console.log(this.state.item);
    orderedItemsActions.add({item: this.state.item});
  }
  componentDidMount() {
    // itemsActions.erase();
    this.unsubscribe = itemsStores.listen(this.onFoundItem.bind(this));
    itemsActions.find({itemId: this.props.params.data});
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onFoundItem(res) {
    console.log("Inside ItemDetail");
    // console.log(res);
    this.setState({item: res});
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.popToTop()}>
        <Icon
          name='ion|ios-arrow-back'
          size={40}
          color='#887700'
          style={{width: 40, height: 40}} />
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, nextState) {
    return null;/*(
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.push({id: 'unknown'})}>
        <Icon
          name='ion|ios-checkmark'
          size={40}
          color='#887700'
          style={{width: 40, height: 40}} />
      </TouchableOpacity>
    );*/
  },
  Title(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Item Details
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 180,
    height: 180,
  },
});

module.exports = ItemDetailView;