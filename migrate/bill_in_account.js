#!/usr/bin/env node

'use strict'

var path = require('path')

global.log = console.log
// 完成发货单，并生成对应账单
global.$config = require('../config')
require('../db')

var User = require('../app/models/user')

// console.log(User)

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    username: 'John',
    password: 'Hancock'
  });
}).then(function(){
  return User.findAll().then(function(users) {
    // console.log(users)
  
    users.forEach(function(user){
      console.log(user.get('username'))
    
    })
  })
})


