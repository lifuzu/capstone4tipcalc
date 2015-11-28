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
var SearchView = require('./SearchView');
var OrderView = require('./OrderView');

var MainView = React.createClass({

  render() {
    return (
      <View style={styles.container}>
      <ScrollableTabView tabBarPosition="bottom" renderTabBar={() => <TabBar />}>
        <View tabLabel="ion|android-search" style={styles.tabView}>
          <SearchView/>
        </View>

        <View tabLabel="ion|disc" style={styles.tabView}>
          <OrderView/>
        </View>
        <ScrollView tabLabel="ion|share" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Share</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ion|ios-chatboxes" style={styles.tabView}>
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
    marginTop: 20,
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