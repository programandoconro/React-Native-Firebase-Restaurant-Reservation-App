"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProjectConfig;

var _getPackageConfiguration = _interopRequireDefault(require("../../tools/getPackageConfiguration"));

var _getPlatforms = require("../../tools/getPlatforms");

var _logger = _interopRequireDefault(require("../../tools/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProjectConfig(ctx, availablePlatforms) {
  const config = (0, _getPackageConfiguration.default)(ctx.root);
  const platformConfigs = {
    ios: undefined,
    android: undefined
  };
  Object.keys(availablePlatforms).forEach(platform => {
    _logger.default.debug(`Getting project config for ${(0, _getPlatforms.getPlatformName)(platform)}...`);

    platformConfigs[platform] = availablePlatforms[platform].projectConfig(ctx.root, config[platform] || {});
  });
  return platformConfigs;
}