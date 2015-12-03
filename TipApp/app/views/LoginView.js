// LoginView.js

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var usersActions = require('../actions/users');
var usersStores = require('../stores/users');

class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      status: ""
    };
  }
  render() {
    return (
      <Navigator
        renderScene={this._renderScene.bind(this)}
        navigator={this.props.navigator}
        navigationBar={
          <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper} />
        } />
    );
  }
  _renderScene(route, navigator) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Please sign in:
        </Text>
        <View>
          <TextInput ref="username"
            placeholder="Username"
            keyboardType="default"
            onChange={(event) => this.setState({username: event.nativeEvent.text})}
            enablesReturnKeyAutomatically={true}
            returnKeyType='next'
            onSubmitEditing={() => this.refs.password.focus()}
            style={styles.formInput}
            value={this.state.username} />
          <TextInput ref="password"
            placeholder="Password"
            secureTextEntry={true}
            autoCorrect={false}
            keyboardType="default"
            enablesReturnKeyAutomatically={true}
            returnKeyType='done'
            onSubmitEditing={this.onSubmitPressed.bind(this)}
            onChange={(event) => this.setState({password: event.nativeEvent.text})}
            style={styles.formInput}
            value={this.state.password} />
          <TouchableHighlight onPress={(this.onSubmitPressed.bind(this))} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={(this.onLogout.bind(this))} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableHighlight>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>"Not a user?"<Text style={styles.whiteFont} onPress={this.onSignup.bind(this)}>  Sign Up</Text></Text>
          </View>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>"Forgot password?"<Text style={styles.whiteFont} onPress={this.onResetPassword.bind(this)}>  Reset</Text></Text>
          </View>
          <Text>{this.state.status}</Text>
        </View>
      </View>
    );
  }
  componentDidMount() {
    this.unsubscribe = usersStores.listen(this.onUserStatus.bind(this));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onUserStatus(status) {
    console.log(status);
    // TODO: Display a dialog here to indicate done, then back to normal process
    this.setState({status: status.action + ' is ' + status.return + '!'});
  }
  onSubmitPressed() {
    var options = {
      username: this.state.username,
      password: this.state.password,
    }
    // console.log(options);
    usersActions.login(options);
  }
  onLogout() {
    usersActions.logout();
  }
  onSignup() {
    this.props.navigator.push({id: 'signup',});
  }
  onResetPassword() {}
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
          Sign In
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 65,
    alignItems: "stretch"
  },
  title: {
    fontSize: 18,
    marginBottom: 10
  },
  formInput: {
    height: 36,
    padding: 10,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#4d90fe',
    borderRadius: 8,
    color: '#4d90fe'
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#4d90fe',
    borderColor: '#4d90fe',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    alignSelf: "center"
  },
  signup: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: .15
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#555555'
  },
});

module.exports = LoginView;