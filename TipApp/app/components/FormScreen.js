/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  Component,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

class FormScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
    }
  }

  render() {
    return (
      <Navigator 
        renderScene = {this.renderScene.bind(this)}
        NavigationBar = {
          <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
            routeMapper={NavigationBarRouteMapper} />
        } />
    );
  }

  renderScene(route, navigator) {
    // return (
    //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <TouchableHighlight
    //         onPress={this.gotoNext.bind(this)}>
    //       <Text style={{color: 'red'}}>下一页</Text>
    //     </TouchableHighlight>
    //   </View>
    // );
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({title:text})}
          placeholder = 'Title Here'
          value={this.state.title} />
        <TextInput
          style={{height: 120, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({content:text})}
          multiline = {true}
          placeholder = 'Content Here'
          value={this.state.content} />
        <TouchableHighlight
            onPress={this.save.bind(this)}>
          <Text style={{color: 'red'}}>Save</Text>
        </TouchableHighlight>
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>
    //       Welcome to React Native!
    //     </Text>
    //     <Text style={styles.instructions}>
    //       To get started, edit index.ios.js
    //     </Text>
    //     <Text style={styles.instructions}>
    //       Press Cmd+R to reload,{'\n'}
    //       Cmd+D or shake for dev menu
    //     </Text>
    //   </View>
    // );
  }

  gotoNext() {
    this.props.navigator.push({
      id: 'MainPage',
      name: '主页',
    });
  }

  save() {
    console.log(this.state.title + ' ' + this.state.content);
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          登录
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = FormScreen;