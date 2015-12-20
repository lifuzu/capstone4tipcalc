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
} = React;

var routes = require('./app/routes');
var scene  = require('./app/scene');

class TipApp extends Component {
  _configureScene(route) {
    if (route.renderConfig) {
      return route.sceneConfig;
    }
    return scene.CustomSceneConfig;
    // return Navigator.SceneConfigs.FloatFromRight;
  }
  render() {
    return (
      <Navigator
        initialRoute = {{id: 'SplashScreen', name: 'Index'}}
        renderScene  = { routes.renderScene.bind(this) }
        configureScene = {this._configureScene}/>
    );
  }
}

AppRegistry.registerComponent('TipApp', () => TipApp);
