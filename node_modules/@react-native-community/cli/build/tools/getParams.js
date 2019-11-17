"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParams;

var _getPackageConfiguration = _interopRequireDefault(require("./getPackageConfiguration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParams(root) {
  const config = (0, _getPackageConfiguration.default)(root);
  return config.params || [];
}