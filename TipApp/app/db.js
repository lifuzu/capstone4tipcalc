'use strict';

var RNDBModel = require('react-native-db-models')
 
var DB = {
    // "app": new RNDBModel.create_db('app'),
    "users": new RNDBModel.create_db('users'),
    "items": new RNDBModel.create_db('items'),
}
 
module.exports = DB