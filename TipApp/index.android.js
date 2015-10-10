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

class TipApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute = {{id: 'SplashScreen', name: 'Index'}}
        renderScene  = { routes.renderScene.bind(this) }
        configureScene = {(route) => {
          if (route.renderConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}/>
    );
  }
}

AppRegistry.registerComponent('TipApp', () => TipApp);
