"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../../tools/logger"));

var _pollParams = _interopRequireDefault(require("./pollParams"));

var _getPlatforms = require("../../tools/getPlatforms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const linkDependency = async (platforms, project, dependency) => {
  const params = await (0, _pollParams.default)(dependency.params);
  Object.keys(platforms || {}).forEach(platform => {
    if (!project[platform] || !dependency.config[platform]) {
      return;
    }

    const linkConfig = platforms[platform] && platforms[platform].linkConfig && platforms[platform].linkConfig();

    if (!linkConfig || !linkConfig.isInstalled || !linkConfig.register) {
      return;
    }

    const isInstalled = linkConfig.isInstalled(project[platform], dependency.name, dependency.config[platform]);

    if (isInstalled) {
      _logger.default.info(`${(0, _getPlatforms.getPlatformName)(platform)} module "${dependency.name}" is already linked`);

      return;
    }

    _logger.default.info(`Linking "${dependency.name}" ${(0, _getPlatforms.getPlatformName)(platform)} dependency`);

    linkConfig.register(dependency.name, dependency.config[platform] || {}, params, // $FlowFixMe: We check if project[platform] exists on line 42
    project[platform]);

    _logger.default.info(`${(0, _getPlatforms.getPlatformName)(platform)} module "${dependency.name}" has been successfully linked`);
  });
};

var _default = linkDependency;
exports.default = _default;