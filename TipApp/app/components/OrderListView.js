'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
} = React;

var { Icon, } = require('react-native-icons');

class OrderListView extends Component {
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
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>list content here</Text>
      </View>
    );
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    return null;
    // return (
    //   <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
    //       onPress={() => navigator.parentNavigator.pop()}>
    //     <Text style={{color: 'white', margin: 10,}}>
    //       Back
    //     </Text>
    //   </TouchableOpacity>
    // );
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

module.exports = OrderListView;