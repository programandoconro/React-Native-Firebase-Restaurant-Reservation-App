"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPackageConfiguration;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns configuration of the CLI from `package.json`.
 */
function getPackageConfiguration(folder) {
  return require(_path().default.join(folder, './package.json')).rnpm || {};
}