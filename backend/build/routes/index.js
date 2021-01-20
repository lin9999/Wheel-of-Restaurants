"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = require("./auth");

var _development = require("./development");

var _main = require("./main");

const wrap = fn => (...args) => fn(...args).catch(args[2]);

function main(app) {
  app.post('/api/signup', wrap(_auth.SignUp));
  app.post('/api/auth', wrap(_auth.Authenticate));
  app.post('/api/UpdateWBList', wrap(_main.UpdateWBList));
  app.get('/api/getInfo', wrap(_main.GetUserInfo));
  app.get('/api/getRestaurantList', wrap(_development.getRestaurantList));
  app.post('/development/addRestaurant', wrap(_development.addNewRestaurant));
  app.delete('/development/clearUsers', wrap(_development.ClearUsers));
  app.delete('/development/ClearRestaurants', wrap(_development.ClearRestaurants));
  app.get('/development/getRestaurantList', wrap(_development.getRestaurantList));
}

var _default = main;
exports.default = _default;