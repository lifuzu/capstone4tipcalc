'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
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
var ItemCell = require('./components/ItemCell');

class SearchListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    }
  }
  render() {
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
        this.renderListView()
      );
    }
  }
  renderListView(){
    // console.log(this.state.dataSource);
    var navigator_placeholder = <View style={{height: NAV_HEIGHT}}></View>;
    return(
      <ScrollView>
        {navigator_placeholder}
        <ListView contentContainerStyle={stylesLocal.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          style={styles.listView}/>
      </ScrollView>
    );
  }
  renderItem(item){
    return(
      <View>
        <Text>{item.name}</Text>
        <Image source={{uri: item.image_url}} style={[stylesLocal.image, {alignItems: "center", resizeMode: 'contain'}]} />
      </View>
    );
    // return(
    //   <ItemCell
    //     item={item}/>
    // );
    //  onSelection={this.selectionItem.bind(this)}
  }
  selectionItem(item) {
    console.log(item);
  }
  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.items),
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
    return null;/*(
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.push({id: 'scan'})}>
        <Icon
          name='ion|ios-plus'
          size={40}
          color='#887700'
          style={{width: 40, height: 40}} />
      </TouchableOpacity>
    );*/
  },
  Title(route, navigator, index, nextState) {
    return (
      <Text style={{color: 'white', margin: 10, fontSize: 16}}>
        Search List
      </Text>
    );
  }
};

var stylesLocal = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    paddingTop: 16
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
  image: {
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
  },
});

module.exports = SearchListView;