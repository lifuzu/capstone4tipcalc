/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  LinkingIOS,
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
  componentDidMount() {
    var url = LinkingIOS.popInitialURL();
    if (url) {
      this._processURL({url});
    }

    LinkingIOS.addEventListener('url', this._processURL);
  }
  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._processURL);
  }
  _processURL(e) {
    console.log(e.url);
    // var url = e.url.replace('tipapp://', '').split('?');
    // var path = url[0];
    // var params = url[1] ? qs.parse(url[1]) : null;
    // // qs has some issues with the __proto__ prop and adds it to the params
    // // we just remove it again
    // delete params.__proto__;

    // this.setState({
    //   path,
    //   params
    // });
    // // do something here based on `path` and `params`
  }
}

AppRegistry.registerComponent('TipApp', () => TipApp);
