'use strict';

var React = require('react-native');
var {
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
var orderedItemsActions = require('../actions/ordered_items');
var orderedItemsStore = require('../stores/ordered_items');

class OrderListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    }
    this.renderItem = this.renderItem.bind(this)
    this.selectionItem = this.selectionItem.bind(this)
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
  renderItem(item: string, sectionID: number, rowID: number){
    return(
      <ItemCell
        onSelection={this.selectionItem.bind(this, item)}
        item={item}/>
    );
  }
  selectionItem(item: string) {
    // console.log(item)
    this.props.navigator.push({id: 'detail', params: {item: item}});
  }
  componentDidMount() {
    // orderedItemsActions.del({itemId: 'menu-item/chicken-fried-steak/'});
    // orderedItemsActions.del({itemId: 'menu-item/fried-chicken/'});
    // orderedItemsActions.erase();

    this.unsubscribe = orderedItemsStore.listen(this.onListDone.bind(this));
    if (!this.state.loaded) orderedItemsActions.list();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onListDone(records) {
    // console.log("onListDone");
    // console.log(records);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(records),
      loaded: true
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.push({id: 'calc'})}>
        <Icon
          name='ion|ios-calculator'
          size={40}
          color='#887700'
          style={{width: 40, height: 40}} />
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.push({id: 'scan'})}>
        <Icon
          name='ion|ios-plus'
          size={40}
          color='#887700'
          style={{width: 40, height: 40}} />
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, nextState) {
    return (
      <Text style={{color: 'white', margin: 10, fontSize: 16}}>
        Ordered List
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
  list: {
    // justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

module.exports = OrderListView;