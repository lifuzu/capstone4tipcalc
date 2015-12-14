// SearchView.js

'use strict';

var React = require('react-native');
var {
  NativeAppEventEmitter,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

var styles = require('../styles');
var Toast = require('react-native-toast');

var WeChat = require('react-native-wechat-ios');
let appid = 'wx05d1430a505e1390';

function show(title, msg='') {
  // AlertIOS.alert(title+'', msg+'');
  Toast.show(title + ' ' + msg);
}

var WeChatShareView = React.createClass({

  getInitialState() {
    return {
      text: "",
    };
  },

  render() {
    return (
      <View style={[styles.container, stylesLocal.container]}>
        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.registerApp}>
          <Text style={styles.buttonTitle}>registerApp</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.registerAppWithDesc}>
          <Text style={styles.buttonTitle}>registerAppWithDesc</Text>
        </TouchableHighlight>
        
        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.isWXAppInstalled}>
          <Text style={styles.buttonTitle}>isWXAppInstalled</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.isWXAppSupportApi}>
          <Text style={styles.buttonTitle}>isWXAppSupportApi</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.getApiVersion}>
          <Text style={styles.buttonTitle}>getApiVersion</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.getWXAppInstallUrl}>
          <Text style={styles.buttonTitle}>getWXAppInstallUrl</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.openWXApp}>
          <Text style={styles.buttonTitle}>openWXApp</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.sendAuthReq}>
          <Text style={styles.buttonTitle}>sendAuthReq</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.button} underlayColor="#f38"
          onPress={this.sendLinkURL}>
          <Text style={styles.buttonTitle}>sendLinkURL</Text>
        </TouchableHighlight>
      </View>
    )
  },

  componentDidMount() {
    // Register Wechat App
    this.registerApp();
    NativeAppEventEmitter.addListener(
      'didRecvAuthResponse',
      (response) => show(JSON.stringify(response))
    );

    NativeAppEventEmitter.addListener(
      'didRecvMessageResponse',
      (response) => {
        if (parseInt(response.errCode) === 0) {
          show('分享成功');
        } else {
          show('分享失败');
        }
      }
    );
  },
  componentWillUnmount() {
  },

  registerApp() {
    WeChat.registerApp(appid, (res) => {
      show('registerApp', res);
    });
  },

  registerAppWithDesc() {
    let appdesc = '测试';
    WeChat.registerApp(appid, appdesc, (res) => {
      show('registerAppWithDesc', res);
    });
  },

  isWXAppInstalled() {
    WeChat.isWXAppInstalled((res) => {
      show('isWXAppInstalled', res);
    });
  },

  getWXAppInstallUrl() {
    WeChat.getWXAppInstallUrl((res) => {
      show('getWXAppInstallUrl', res);
    });
  },

  isWXAppSupportApi() {
    WeChat.isWXAppSupportApi((res) => {
      show('isWXAppSupportApi', res);
    });
  },

  getApiVersion() {
    WeChat.getApiVersion((res) => {
      show('getApiVersion', res);
    });
  },

  openWXApp() {
    WeChat.openWXApp((res) => {
      show('openWXApp', res);
    });
  },

  sendAuthReq() {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_test'; 
    WeChat.sendAuthReq(scope, state, (res) => {
      show('sendAuthReq', res);
    });
  },

  sendLinkURL() {
    WeChat.sendLinkURL({
      link: 'lifuzu.com',
      tagName: '测试',
      title: '哈哈哈哈哈哈',
      desc: '噢噢噢饿饿饿饿饿',
      thumbImage: 'https://dn-qianlonglaile.qbox.me/static/pcQianlong/images/buy_8e82463510d2c7988f6b16877c9a9e39.png',
      scene: 1
    });
  },

});

var stylesLocal = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      width: 200,
      height: 40,
      marginBottom: 10,
      borderRadius: 6,
      backgroundColor: '#f38',
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonTitle: {
      fontSize: 16,
      color: '#fff'
  }
});

module.exports = WeChatShareView;