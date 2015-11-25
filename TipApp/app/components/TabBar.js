// TabBar.js

'use strict';

// TODO: var -> const
var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} = React;

var { Icon, } = require('react-native-icons');
var deviceWidth = require('Dimensions').get('window').width;
var precomputeStyle = require('precomputeStyle');
var TAB_UNDERLINE_REF = 'TAB_UNDERLINE';

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  tabs: {
    height: 50,
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
});

var TabBar = React.createClass({

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={[styles.tab]}>
        <Icon name={name} size={30} color='#3B5998' style={{width: 30, height: 30, position: 'absolute', top: 0, left: 20}}
              ref={(icon) => { this.selectedTabIcons[page] = icon }}/>
        <Icon name={name} size={30} color='#ccc' style={{width: 30, height: 30, position: 'absolute', top: 0, left: 20}}
              ref={(icon) => { this.unselectedTabIcons[page] = icon }}/>
      </TouchableOpacity>
    );
  },

  setAnimationValue(value) {
    this.refs[TAB_UNDERLINE_REF].setNativeProps(precomputeStyle({
      left: (deviceWidth * value) / this.props.tabs.length
    }));
  },

  render() {
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: deviceWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <View style={tabUnderlineStyle} ref={TAB_UNDERLINE_REF} />
      </View>
    );
  },
});

module.exports = TabBar;