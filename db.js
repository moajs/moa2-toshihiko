"use strict";

const env = process.env.NODE_ENV || "development";
const config = $config.database[env]

// const config = require("./config");
var T = require("toshihiko");

var toshihiko = new T.Toshihiko(config.database, config.username, config.password, {
    
});

module.exports = toshihiko;