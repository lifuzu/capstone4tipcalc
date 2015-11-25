// MainView.js
var React = require('react-native');

var {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var ScrollableTabView = require('react-native-scrollable-tab-view');
var TabBar = require('./FacebookTabBar');
var deviceWidth = Dimensions.get('window').width;

var MainView = React.createClass({
  getDefaultProps() {
    return {
      tabBarPosition: 'bottom',
      // edgeHitWidth: 30,
      // springTension: 50,
      // springFriction: 10
    }
  },
  render() {
    return (
      <View style={styles.container}>
      <ScrollableTabView tabBarPosition="bottom" renderTabBar={() => <TabBar />}>
        <ScrollView tabLabel="ion|ios-paper" style={styles.tabView}>
          <View style={styles.card}>
            <Text>News</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ion|person-stalker" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Friends</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ion|ios-chatboxes" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Messenger</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ion|ios-world" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Notifications</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ion|navicon-round" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Other nav</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  tabView: {
    width: deviceWidth,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

module.exports = MainView;