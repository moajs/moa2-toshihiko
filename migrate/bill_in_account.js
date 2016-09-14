#!/usr/bin/env node

'use strict'

var path = require('path')

global.log = console.log
// 完成发货单，并生成对应账单
global.$config = require('../config')
require('../db')

var User = require('../app/models/user')

// console.log(User)

// return User.build({
//   username: 'John',
//   password: 'Hancock'
// }).insert().$promise
// .then(function(){
//   return
// })
//
//

User.find().$promise.then(function(users) {
   console.log(users[0])
})