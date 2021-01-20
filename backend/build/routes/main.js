"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserInfo = GetUserInfo;
exports.UpdateWBList = UpdateWBList;

var _account = _interopRequireDefault(require("../models/account.js"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function GetUserInfo(req, res) {
  const UID = req.query.UID;

  _account.default.findOne({
    _id: UID
  }).exec(function (err, account) {
    if (!account) {
      console.log("[Error]: Fatal error - Account with UID not found!");
      res.status(200).send({
        message: "Something went wrong... "
      });
    } else {
      res.status(200).send({
        message: "Success",
        userInfo: (({
          userName,
          favorite,
          blacklist
        }) => ({
          userName,
          favorite,
          blacklist
        }))(account)
      });
      console.log("User Info sent");
    }
  });
}

async function UpdateWBList(req, res) {
  const UID = req.body.UID;

  _account.default.update({
    _id: UID
  }, {
    favorite: req.body.favorite,
    blacklist: req.body.blacklist
  }, function (err, log) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({
        message: "Success"
      });
    }
  });
}