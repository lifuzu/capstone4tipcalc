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
var Camera = require("react-native-camera");

class ScanView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCamera: true,
      cameraType: Camera.constants.Type.back
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
      this._renderCamera()
    );
    // return (
    //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <TouchableOpacity
    //         onPress={this._gotoNext.bind(this)}>
    //       <Text>scanner here</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
  }
  _gotoNext() {
    this.props.navigator.push({
      id: 'NoNavigatorPage',
      // sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
  _renderCamera() {
    if(this.state.showCamera) {
      return (
        <Camera
          ref="cam"
          style={styles.container}
          onBarCodeRead={this._onBarCodeRead.bind(this)}
          type={this.state.cameraType}>
        </Camera>
      );
    } else {
      return (
        <View></View>
      );
    }
  }
  _onBarCodeRead(e) {
    console.log(e.type + ":" + e.data)
    this.setState({showCamera: false});
    this.props.navigator.push({
      id: 'detail',
      // sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
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
    return (
      <Text style={{color: 'white', margin: 10, fontSize: 16}}>
        Scanning
      </Text>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  }
});

module.exports = ScanView;