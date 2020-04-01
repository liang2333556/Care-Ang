'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
var keys = require('../keys')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    IMG_URL: '"http://localhost:9988"',
    SOCKETIO: '"http://localhost:9988/"',
  CLIENT_ID: '"a281614d7f34dc30b665dfcaa3ed7505"',
  API_KEY: keys.dev,
  API_URL: {
    geocode: '"http://localhost:9988/geocode/v1/json?"',
    weather: '"http://localhost:9988/weather/v1/json?"'
  }
});
