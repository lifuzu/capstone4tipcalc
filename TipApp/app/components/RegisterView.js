// RegisterView.js

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

class RegisterView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email_address: ""
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
          Please signup:
        </Text>
        <View>
          <TextInput
            placeholder="Username"
            onChange={(event) => this.setState({username: event.nativeEvent.text})}
            style={styles.formInput}
            value={this.state.username} />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChange={(event) => this.setState({password: event.nativeEvent.text})}
            style={styles.formInput}
            value={this.state.password} />
          <TextInput
            placeholder="Email Address"
            onChange={(event) => this.setState({email_address: event.nativeEvent.text})}
            style={styles.formInput}
            value={this.state.email_address} />
          <TouchableHighlight onPress={(this.onSubmitPressed.bind(this))} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>"Have an account already?"<Text style={styles.whiteFont} onPress={this.onSignin.bind(this)}>  Sign In</Text></Text>
          </View>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>"Forgot password?"<Text style={styles.whiteFont} onPress={this.onResetPassword.bind(this)}>  Reset</Text></Text>
          </View>
        </View>
      </View>
    );
  }
  onSubmitPressed() {}
  onSignin() {
    this.props.navigator.push({id: 'signin',});
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
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    padding: 30,
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
    borderColor: "#555555",
    borderRadius: 8,
    color: "#555555"
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: "#555555",
    borderColor: "#555555",
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

module.exports = RegisterView;