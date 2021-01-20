"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewRestaurant = addNewRestaurant;
exports.ClearUsers = ClearUsers;
exports.ClearRestaurants = ClearRestaurants;
exports.getRestaurantList = getRestaurantList;

var _restaurant = _interopRequireDefault(require("../models/restaurant"));

var _account = _interopRequireDefault(require("../models/account.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addNewRestaurant(req, res) {
  const newRestaurant = req.body;

  _restaurant.default.create(newRestaurant, function (err, account, next) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        console.log("[Error]: Restaurant existed!");
        res.status(200).send({
          message: "Restaurant existed!"
        });
      }

      console.log(err);
    } else {
      console.log("[Create]: " + JSON.stringify(newRestaurant));
      res.status(200).send({
        message: "Success"
      });
    }
  });
}

async function ClearUsers(req, res) {
  _account.default.remove({}, function (err) {
    console.log('[Warning]: \"Account\" collection removed');
  });
}

async function ClearRestaurants(req, res) {
  _restaurant.default.remove({}, function (err) {
    console.log('[Warning]: \"Restaurant\" collection removed');
  });
}

async function getRestaurantList(req, res) {
  _restaurant.default.find({}).exec(function (err, restaurants) {
    res.status(200).send(restaurants);
  });
}