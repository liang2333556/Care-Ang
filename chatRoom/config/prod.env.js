'use strict'
var keys = require('../keys')

module.exports = {
    NODE_ENV: '"production"',
    IMG_URL: '""',
    SOCKETIO: '"http://localhost:9988/"',
  API_KEY: keys.prod,
  CLIENT_ID: '"a281614d7f34dc30b665dfcaa3ed7505"',
  API_URL: {
    geocode: '"https://api.weather.kmr.io/geocode/v1/json?"',
    weather: '"https://api.weather.kmr.io/weather/v1/json?"'
  }
};
