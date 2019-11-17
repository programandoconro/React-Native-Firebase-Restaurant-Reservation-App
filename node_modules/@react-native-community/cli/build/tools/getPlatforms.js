"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPlatforms;
exports.getPlatformName = getPlatformName;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _findPlugins = _interopRequireDefault(require("./findPlugins"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Support for `ios` and `android` platforms is built-in
 *
 * @todo(grabbou): Move this out of the core to increase "interoperability"
 * with other platforms
 */
const builtInPlatforms = {
  ios: require('./ios'),
  android: require('./android')
};
/**
 * Returns an object with available platforms
 */

function getPlatforms(root) {
  const plugins = (0, _findPlugins.default)(root);
  /**
   * Each `platfom` is a file that should define an object with platforms available
   * and the config required.
   *
   * @todo(grabbou): We should validate if the config loaded is correct, warn and skip
   * using it if it's invalid.
   */

  const projectPlatforms = plugins.platforms.reduce((acc, pathToPlatform) => Object.assign(acc, require(_path().default.join(root, 'node_modules', pathToPlatform))), {});
  return _objectSpread({}, builtInPlatforms, projectPlatforms);
}

const names = {
  ios: 'iOS',
  android: 'Android'
};

function getPlatformName(name) {
  return names[name] || name;
}