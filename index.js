global.debug = require('debug')('moa2');

var app = require('moa2')(__dirname + '/config')

debug($config)
debug($global_middlewares)
debug($middlewares)
debug($controllers)
debug($models)

// for (var key in $models) {
//   var User = $models[key]
//   User.sync({force: false})
// }
// app.start(4000);
module.exports = app