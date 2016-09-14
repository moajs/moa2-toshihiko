"use strict";

/**
 * Created by Moajs on June 8th 2016, 8:57:06 pm.
 */

var User = $models.user;


exports.list = (ctx, next) => {
  console.log(ctx.method + ' /users => list, query: ' + JSON.stringify(ctx.query));

  return User.find().$promise.then(function(users) {
    return ctx.render('users/index', {
      users : users
    })
  });

};

exports.new = (ctx, next) => {
  console.log(ctx.method + ' /users/new => new, query: ' + JSON.stringify(ctx.query));

  return ctx.render('users/new', {
    user : {
      "_action" : "new"
    }
  })
};

exports.show = (ctx, next) => {
  console.log(ctx.method + ' /users/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  var id = ctx.params.id;

  return User.where({
    id: id
  }).findOne().$promise.then( user => {
    console.log(user);
    return ctx.render('users/show', {
      user : user
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.edit = (ctx, next) => {
  console.log(ctx.method + ' /users/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  var id = ctx.params.id;

  return User.where({
    id: id
  }).findOne().$promise.then( user => {
    console.log(user);
    user._action = 'edit';

    return ctx.render('users/edit', {
      user : user
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.create = (ctx, next) => {
  console.log(ctx.method + ' /users => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  return User.build({username: ctx.request.body.username,password: ctx.request.body.password,avatar: ctx.request.body.avatar,phone_number: ctx.request.body.phone_number,address: ctx.request.body.address}).insert().$promise.then( user => {
    console.log(user)
    return ctx.render('users/show', {
      user : user
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.update = (ctx, next) => {
  console.log(ctx.method + ' /users/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  var id = ctx.params.id;

  return User.where({
      id: id
    }).findOne().$promise.then( user => {
    return user.updateByJson({username: ctx.request.body.username,password: ctx.request.body.password,avatar: ctx.request.body.avatar,phone_number: ctx.request.body.phone_number,address: ctx.request.body.address}).$promise
  }).then( user => {
    console.log(user);

    return ctx.body = ({
      data:{
        redirect : '/users/' + id
      },
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  }).catch((err)=>{
      return ctx.api_error(err);
  });
  
};

exports.destroy = (ctx, next) => {
  console.log(ctx.method + ' /users/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  var id = ctx.params.id;

  return User.where({
      id: id
    }).delete().$promise.then( () =>{
    return ctx.body= ({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

// -- custom

// -- custom api
exports.api = {
  list: (ctx, next) => {
    var user_id = ctx.api_user.id;

    return User.find().$promise.then(function(users) {
      return ctx.api({
        users : users
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  show: (ctx, next) => {
    var user_id = ctx.api_user.id;
    var id = ctx.params.user_id;

    return User.where({
      id: id
    }).findOne().$promise.then( user => {
      return ctx.api({
        user : user
      });
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  create: (ctx, next) => {
    var user_id = ctx.api_user.id;

    return User.build({username: ctx.request.body.username,password: ctx.request.body.password,avatar: ctx.request.body.avatar,phone_number: ctx.request.body.phone_number,address: ctx.request.body.address}).insert().$promise.then( user => {
      return ctx.body = ({
        user : user
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });

  },
  update: (ctx, next) => {
    var user_id = ctx.api_user.id;
    var id = ctx.params.user_id;
    return  User.where({
        id: id
      }).findOne().$promise.then( user => {
      return user.updateByJson({username: ctx.request.body.username,password: ctx.request.body.password,avatar: ctx.request.body.avatar,phone_number: ctx.request.body.phone_number,address: ctx.request.body.address}).$promise
    }).then(user=> {
      return ctx.api({
        user : user,
        redirect : '/users/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  delete: (ctx, next) => {
    var user_id = ctx.api_user.id;
    var id = ctx.params.user_id;

    return User.where({
      id: id
    }).delete().$promise.then(function(){
      return ctx.api({id: id})
    }).catch((err)=>{
      return ctx.api_error(err);
    }); 
  }
}
