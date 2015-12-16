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

class CalcView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input_amount: 400.89,
      tip_rate_percent: 15,
      guest: 1,
      tips_total: 123.34,
      tips_per_guest: 12.34,
      amount_total: 234.56,
      amount_per_guest: 34.56,
    }
    this.calculate = this.calculate.bind(this)
    this.onSurvey = this.onSurvey.bind(this)
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
  calculate() {
    var input_amount = this.state.input_amount;
    var tip_rate_percent = this.state.tip_rate_percent;
    var guest = this.state.guest;
    console.log(input_amount);
    console.log(tip_rate_percent);
    console.log(guest);
    var tips_total = parseFloat(input_amount * tip_rate_percent / 100 ).toFixed(2);
    var amount_total = (parseFloat(input_amount) + parseFloat(tips_total)).toFixed(2);
    var tips_per_guest = Math.ceil(tips_total / guest);
    var amount_per_guest = Math.ceil(amount_total / guest);
    this.setState({tips_total: tips_total});
    this.setState({tips_per_guest: tips_per_guest});
    this.setState({amount_total: amount_total});
    this.setState({amount_per_guest: amount_per_guest});
  }

  onSurvey() {
    // console.log('onSurvey');
    this.props.navigator.push({id: 'survey'});
  }

  _renderScene(route, navigator) {
    return (
      <View style={[stylesLocal.container]}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5}}
          onChangeText={(text) => { this.setState({input_amount: parseFloat(text.replace('$ ', '')).toFixed(2)}); this.calculate(); } }
          autoFocus={true}
          textAlign={"right"}
          keyboardType={"numeric"}
          clearButtonMode={"always"}
          enablesReturnKeyAutomatically={true}
          returnKeyType={"go"}
          placeholder={"$ 0.00"}
          value={'$ ' + this.state.input_amount}
          defaultValue={'$ ' + this.state.input_amount} />

        <View style={{flexDirection: "row", marginTop: 20, justifyContent: "space-between", marginLeft: 10, marginRight: 10}}>
          <Text>Tips</Text><Text>{this.state.tip_rate_percent + "%"}</Text><Text onPress={this.onSurvey.bind(this)}>></Text>
        </View>
        <SliderIOS
          style={stylesLocal.slider}
          maximumValue={30}
          minimumValue={0}
          step={1}
          value={this.state.tip_rate_percent}
          onValueChange={(value) => {this.setState({tip_rate_percent: parseInt(value)}); this.calculate();}} />
        <View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginRight: 10}}>
          <Text>{"0%"}</Text><Text>{"30%"}</Text>
        </View>

        <View style={{flexDirection: "row", marginTop: 10, justifyContent: "space-between", marginLeft: 10, marginRight: 10}}>
          <Text>Guest</Text><Text>{this.state.guest}</Text><Text></Text>
        </View>
        <SliderIOS
          style={stylesLocal.slider}
          maximumValue={10}
          minimumValue={1}
          step={1}
          value={this.state.guest}
          onValueChange={(value) => {this.setState({guest: parseInt(value)}); this.calculate();}} />
        <View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginRight: 10}}>
          <Text>{"1"}</Text><Text>{"10"}</Text>
        </View>
        <View style={{flexDirection: "row", marginTop: 10, justifyContent: "flex-end", marginLeft: 10, marginRight: 10}}>
        <Text>{"Per guest"}</Text>
        </View>

        <View style={{flexDirection: "row", marginTop: 5}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', padding: 5, flex: 1}}
            editable={false}
            defaultValue={"Tips:"} />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, flex: 1}}
            editable={false}
            defaultValue={"$ " + this.state.tips_total} />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, flex: 1}}
            editable={false}
            defaultValue={"$ " + this.state.tips_per_guest} />
        </View>
        <View style={{flexDirection: "row", marginTop: 5}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', padding: 5, flex: 1}}
            editable={false}
            defaultValue={"Amount:"} />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, flex: 1}}
            editable={false}
            defaultValue={"$ " + this.state.amount_total} />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, flex: 1}}
            editable={false}
            defaultValue={"$ " + this.state.amount_per_guest} />
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
        Calculator
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

module.exports = CalcView;