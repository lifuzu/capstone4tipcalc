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
var NAV_HEIGHT = require('../variables')('NAV_HEIGHT');
var itemsActions = require('../actions/items');
var itemsStores = require('../stores/items');
var orderedItemsActions = require('../actions/ordered_items');
var FilledButton = require('./components/FilledButton');

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
        initialRoute={{onConfirm: this._onSubmit.bind(this)}}
        navigationBar={
          <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
            routeMapper={NavigationBarRouteMapper} />
        } />
    );
  }
  _renderScene(route, navigator) {
    var image_display = this.state.item && this.state.item.featured_image ?
      <Image source={{uri: this.state.item.featured_image.source}} style={[styles.image, {overflow: 'visible'}]} /> : null;
    var navigator_placeholder = <View style={{height: NAV_HEIGHT + 5 }}></View>;
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        {navigator_placeholder}
        {image_display}
        <Text>{this.state.item.title}</Text>
        <Text>{this.state.item.content}</Text>

        <FilledButton
          style={{marginTop:5, backgroundColor:'#0ea378'}}
          highlightedColor='#007655'
          title={"Share"}
          titleStyle={{color:'white'}}
          onPress={() => console.log(this.state.item)} />
      </ScrollView>
    );
        // <Button
        //   style={{fontSize: 20, color: 'green'}}
        //   styleDisabled={{color: 'red'}}
        //   onPress={this._onSubmit.bind(this)}>
        //   Confirm!
        // </Button>
  }
  _onSubmit() {
    // console.log("in _onSubmit");
    // console.log(this.state.item);
    orderedItemsActions.add({item: this.state.item});
    this.props.navigator.popToTop();
  }
  componentDidMount() {
    // itemsActions.erase();
    this.unsubscribe = itemsStores.listen(this.onFoundItem.bind(this));
    if (this.props.params && this.props.params.data) {
      itemsActions.find({itemId: this.props.params.data});
    } else if (this.props.params && this.props.params.item) {
      this.setState({item: this.props.params.item});
    }
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onFoundItem(res) {
    // console.log("Inside ItemDetail");
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
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => route.onConfirm() }>
        <Icon
          name='ion|ios-checkmark'
          size={40}
          color='#887700'
          style={{width: 40, height: 40}} />
      </TouchableOpacity>
    );
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