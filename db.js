"use strict";

const env = process.env.NODE_ENV || "development";
const config = $config.database[env]

// const config = require("./config");
const fs = require("fs");
const path = require("path");
const sequelize = require("sequelize");
const modelsPath = path.join(__dirname, "/models/");

// var connection = new sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: config.dialect,
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

var T = require("toshihiko");

var toshihiko = new T.Toshihiko(config.database, config.username, config.password, {
    
});

module.exports = toshihiko;