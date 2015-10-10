/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var SplashScreen = require('./app/components/SplashScreen');
var FormScreen   = require('./app/components/FormScreen');
var MainPage     = require('./app/components/MainPage');

class TipApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute = {{id: 'SplashScreen', name: 'Index'}}
        renderScene  = { this.renderScene.bind(this) }
        configureScene = {(route) => {
          if (route.renderConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}/>
    );
    // return (
    //   <NavigatorIOS
    //     style={styles.container}
    //     initialRoute={routes.FormScreen()}/>
    // );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SplashScreen') {
      return (
        <SplashScreen
          navigator={navigator} />
      );
    }
    if (routeId === 'FormScreen') {
      return (
        <FormScreen
          navigator={navigator} />
      );
    }
    if (routeId === 'MainPage') {
      return (
        <MainPage
          navigator={navigator} />
      );
    }
    return this.noRoute(navigator);
  }

  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>请在 index.js 的 renderScene 中配置这个页面的路由</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('TipApp', () => TipApp);
