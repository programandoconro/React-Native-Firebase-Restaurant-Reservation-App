"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _lodash() {
  const data = require("lodash");

  _lodash = function () {
    return data;
  };

  return data;
}

var _logger = _interopRequireDefault(require("../../tools/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const linkAssets = (platforms, project, assets) => {
  if ((0, _lodash().isEmpty)(assets)) {
    return;
  }

  Object.keys(platforms || {}).forEach(platform => {
    const linkConfig = platforms[platform] && platforms[platform].linkConfig && platforms[platform].linkConfig();

    if (!linkConfig || !linkConfig.copyAssets || !project[platform]) {
      return;
    }

    _logger.default.info(`Linking assets to ${platform} project`); // $FlowFixMe: We check for existence of project[platform]


    linkConfig.copyAssets(assets, project[platform]);
  });

  _logger.default.info('Assets have been successfully linked to your project');
};

var _default = linkAssets;
exports.default = _default;