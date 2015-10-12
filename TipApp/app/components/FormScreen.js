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

var usersActions = require('../actions/users');
var usersStores = require('../stores/users');
var postsActions = require('../actions/posts');
// var postsStores = require('../stores/posts');

class FormScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: 'T',
      content: 'Content',
      username: 'Q',
      email: 'q@q.com',
      user_pass: 'w',
      display_name: 'DN',
    }
  }

  componentDidMount() {
    this.unsubscribe = usersStores.listen(this.onUserRegisterDone.bind(this));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onUserRegisterDone(res) {
    console.log("Inside FormScreen");
    console.log(res);
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
          onChangeText={(text) => this.setState({username:text})}
          placeholder = 'Username'
          value={this.state.username} />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({email:text})}
          multiline = {true}
          placeholder = 'Email address'
          value={this.state.email} />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({user_pass:text})}
          multiline = {true}
          placeholder = 'Password'
          value={this.state.user_pass} />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({display_name:text})}
          multiline = {true}
          placeholder = 'Display name'
          value={this.state.display_name} />
        <TouchableHighlight
            onPress={this.register.bind(this)}>
          <Text style={{color: 'red'}}>Register</Text>
        </TouchableHighlight>

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

  register() {
    var options = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      display_name: this.state.display_name,
    }
    console.log(options);
    usersActions.register(options);
  }

  save() {
    var options = {
      title: this.state.title,
      content: this.state.content,
    }
    console.log(options);
    postsActions.create(options);
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