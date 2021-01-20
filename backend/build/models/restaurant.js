"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const RestaurantSchema = Schema({
  restaurantName: {
    type: String,
    required: true,
    unique: true
  },
  googleurl: {
    type: String,
    required: true
  },
  mapurl: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  regionTag: {
    type: String
  },
  categoryTag: {
    type: String
  },
  priceTag: {
    type: String
  }
}, {
  _id: true,
  collection: 'Restaurant'
});

const exportSchema = _mongoose.default.model('Restaurant', RestaurantSchema);

var _default = exportSchema;
exports.default = _default;