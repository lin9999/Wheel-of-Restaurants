"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const AccountSchema = Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorite: [{
    type: String
  }],
  blacklist: [{
    type: String
  }],
  recentVisit: [{
    type: String
  }],
  identity: {
    type: String,
    required: true
  }
}, {
  _id: true,
  collection: 'Account',
  timestamps: {
    createdAt: 'created_at'
  }
});

const exportSchema = _mongoose.default.model('Account', AccountSchema);

var _default = exportSchema;
exports.default = _default;