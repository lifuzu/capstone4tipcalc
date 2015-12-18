'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  SliderIOS,
  Text,
  TextInput,
  Navigator,
  TouchableOpacity,
} = React;

var { Icon, } = require('react-native-icons');
var styles = require('../styles');

class SurveyView extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    return (
      <View style={[stylesLocal.container]}>

        <View style={{flexDirection: "row", marginTop: 10, marginLeft: 10, marginRight: 10}}>
          <Icon
            name='fontawesome|question'smile-o
            size={80}
            color='#887700'
            style={{width: 80, height: 80, flex: 1}} />
          <View style={{flexDirection: "column", flex: 6}}>
            <Text style={{height: 40, fontWeight: "bold", textAlign: "left", paddingLeft: 35, paddingTop: 20 }}>How long did you wait for?</Text>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
              <Icon
                name='fontawesome|frown-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
              <Icon
                name='fontawesome|meh-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
              <Icon
                name='fontawesome|smile-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
            </View>
          </View>
        </View>
        <View style={{flexDirection: "row", marginTop: 10, marginLeft: 10, marginRight: 10, borderTopWidth: 1}}>
          <Icon
            name='fontawesome|question'smile-o
            size={80}
            color='#887700'
            style={{width: 80, height: 80, flex: 1}} />
          <View style={{flexDirection: "column", flex: 6}}>
            <Text style={{height: 40, fontWeight: "bold", textAlign: "left", paddingLeft: 35, paddingTop: 20 }}>How well they serviced?</Text>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
              <Icon
                name='fontawesome|frown-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
              <Icon
                name='fontawesome|meh-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
              <Icon
                name='fontawesome|smile-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
            </View>
          </View>
        </View>
        <View style={{flexDirection: "row", marginTop: 10, marginLeft: 10, marginRight: 10, borderTopWidth: 1}}>
          <Icon
            name='fontawesome|question'smile-o
            size={80}
            color='#887700'
            style={{width: 80, height: 80, flex: 1}} />
          <View style={{flexDirection: "column", flex: 6}}>
            <Text style={{height: 40, fontWeight: "bold", textAlign: "left", paddingLeft: 35, paddingTop: 20 }}>Did you like the food?</Text>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
              <Icon
                name='fontawesome|frown-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
              <Icon
                name='fontawesome|meh-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
              <Icon
                name='fontawesome|smile-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
            </View>
          </View>
        </View>
        <View style={{flexDirection: "row", marginTop: 10, marginLeft: 10, marginRight: 10, borderTopWidth: 1}}>
          <Icon
            name='fontawesome|question'smile-o
            size={80}
            color='#887700'
            style={{width: 80, height: 80, flex: 1}} />
          <View style={{flexDirection: "column", flex: 6}}>
            <Text style={{height: 40, fontWeight: "bold", textAlign: "left", paddingLeft: 35, paddingTop: 20 }}>Did you like the ambience?</Text>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
              <Icon
                name='fontawesome|frown-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
              <Icon
                name='fontawesome|meh-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
              <Icon
                name='fontawesome|smile-o'
                size={40}
                color='#887700'
                style={{width: 40, height: 40}} />
            </View>
          </View>
        </View>
      </View>
    );
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
    return (
      <Text style={{color: 'white', margin: 10, fontSize: 16}}>
        Survey
      </Text>
    );
  }
};

var stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 20 + 60,
  },
  slider: {
    height: 10,
    margin: 10,
  },
});

module.exports = SurveyView;