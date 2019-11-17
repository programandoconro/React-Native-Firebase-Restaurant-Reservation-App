"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _util() {
  const data = _interopRequireDefault(require("util"));

  _util = function () {
    return data;
  };

  return data;
}

var _getPlatforms = _interopRequireDefault(require("./getPlatforms"));

var _getPackageConfiguration = _interopRequireDefault(require("./getPackageConfiguration"));

var _getHooks = _interopRequireDefault(require("./getHooks"));

var _getAssets = _interopRequireDefault(require("./getAssets"));

var _getParams = _interopRequireDefault(require("./getParams"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const generateDeprecationMessage = api => `${api} is deprecated and will be removed soon. Please check release notes on how to upgrade`;
/**
 * Gets legacy configuration to support existing plugins while they migrate
 * to the new API
 *
 * This file will be removed from the next version.
 */


var _default = root => ({
  getPlatformConfig: _util().default.deprecate(() => (0, _getPlatforms.default)(root), generateDeprecationMessage('getPlatformConfig()')),
  getProjectConfig: _util().default.deprecate(() => {
    const platforms = (0, _getPlatforms.default)(root);
    const rnpm = (0, _getPackageConfiguration.default)(root);

    const config = _objectSpread({}, rnpm, {
      assets: (0, _getAssets.default)(root)
    });

    Object.keys(platforms).forEach(key => {
      config[key] = platforms[key].projectConfig(root, rnpm[key] || {});
    });
    return config;
  }, generateDeprecationMessage('getProjectConfig()')),
  getDependencyConfig: _util().default.deprecate(packageName => {
    const platforms = (0, _getPlatforms.default)(root);

    const folder = _path().default.join(process.cwd(), 'node_modules', packageName);

    const rnpm = (0, _getPackageConfiguration.default)(folder);

    const config = _objectSpread({}, rnpm, {
      assets: (0, _getAssets.default)(folder),
      commands: (0, _getHooks.default)(folder),
      params: (0, _getParams.default)(folder)
    });

    Object.keys(platforms).forEach(key => {
      config[key] = platforms[key].dependencyConfig(folder, rnpm[key] || {});
    });
    return config;
  }, generateDeprecationMessage('getDependencyConfig()'))
});

exports.default = _default;