"use strict";

var T = require("toshihiko");

const Toshihiko = require('toshihiko')

/**
 * Created by alfred on June 8th 2016, 8:57:06 pm.
 */

var connection = require('../../db')


var User = connection.define('user', [
  { name: "id", column: "id", primaryKey: true, type: Toshihiko.Type.Integer, autoIncrement: true },
  {
    name: 'username', 
    type: Toshihiko.Type.String
  },
   {
    name: 'password', 
    type: Toshihiko.Type.String
  },
   {
    name: 'avatar', 
    type: Toshihiko.Type.String
  },
   {
    name: 'phone_number', 
    type: Toshihiko.Type.String
  },
  {
    name: 'address', 
    type: Toshihiko.Type.String
  }
]);

console.log(User)
 
module.exports = User;