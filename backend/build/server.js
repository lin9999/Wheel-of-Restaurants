"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("./routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
const port = process.env.PORT || 4000;
const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10
}; // connect mongodb

_mongoose.default.connect(process.env.MONGO_URL, dboptions);

const db = _mongoose.default.connection;
db.on('error', error => {
  console.error(error);
});
db.once('open', () => {
  console.log('MongoDB connected!');
  (0, _index.default)(app);
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});