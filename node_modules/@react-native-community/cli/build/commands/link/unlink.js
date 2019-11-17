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

var _getProjectConfig = _interopRequireDefault(require("./getProjectConfig"));

var _getDependencyConfig = _interopRequireDefault(require("./getDependencyConfig"));

var _getProjectDependencies = _interopRequireDefault(require("./getProjectDependencies"));

var _promiseWaterfall = _interopRequireDefault(require("./promiseWaterfall"));

var _commandStub = _interopRequireDefault(require("./commandStub"));

var _promisify = _interopRequireDefault(require("./promisify"));

var _getPlatforms = _interopRequireWildcard(require("../../tools/getPlatforms"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const unlinkDependency = (platforms, project, dependency, packageName, otherDependencies) => {
  Object.keys(platforms || {}).forEach(platform => {
    if (!project[platform] || !dependency.config[platform]) {
      return;
    }

    const linkConfig = platforms[platform] && platforms[platform].linkConfig && platforms[platform].linkConfig();

    if (!linkConfig || !linkConfig.isInstalled || !linkConfig.unregister) {
      return;
    }

    const isInstalled = linkConfig.isInstalled(project[platform], packageName, dependency.config[platform]);

    if (!isInstalled) {
      _logger.default.info(`${(0, _getPlatforms.getPlatformName)(platform)} module "${packageName}" is not installed`);

      return;
    }

    _logger.default.info(`Unlinking "${packageName}" ${(0, _getPlatforms.getPlatformName)(platform)} dependency`);

    linkConfig.unregister(packageName, // $FlowFixMe: We check for existence on line 38
    dependency.config[platform], // $FlowFixMe: We check for existence on line 38
    project[platform], otherDependencies);

    _logger.default.info(`${(0, _getPlatforms.getPlatformName)(platform)} module "${dependency.name}" has been successfully unlinked`);
  });
};
/**
 * Updates project and unlink specific dependency
 *
 * If optional argument [packageName] is provided, it's the only one
 * that's checked
 */


function unlink(args, ctx) {
  const packageName = args[0];
  let platforms;

  try {
    platforms = (0, _getPlatforms.default)(ctx.root);
  } catch (err) {
    _logger.default.error("No package.json found. Are you sure it's a React Native project?");

    return Promise.reject(err);
  }

  const allDependencies = (0, _getProjectDependencies.default)(ctx.root).map(dependency => (0, _getDependencyConfig.default)(ctx, platforms, dependency));
  let otherDependencies;
  let dependency;

  try {
    const idx = allDependencies.findIndex(p => p.name === packageName);

    if (idx === -1) {
      throw new Error(`Project "${packageName}" is not a react-native library`);
    }

    otherDependencies = [...allDependencies];
    dependency = otherDependencies.splice(idx, 1)[0];
  } catch (err) {
    return Promise.reject(err);
  }

  const project = (0, _getProjectConfig.default)(ctx, platforms);
  const tasks = [() => (0, _promisify.default)(dependency.commands.preunlink || _commandStub.default), () => unlinkDependency(platforms, project, dependency, packageName, otherDependencies), () => (0, _promisify.default)(dependency.commands.postunlink || _commandStub.default)];
  return (0, _promiseWaterfall.default)(tasks).then(() => {
    // @todo move all these to `tasks` array, just like in
    // link
    const assets = (0, _lodash().difference)(dependency.assets, (0, _lodash().flatten)(allDependencies, d => d.assets));

    if ((0, _lodash().isEmpty)(assets)) {
      return;
    }

    Object.keys(platforms || {}).forEach(platform => {
      const linkConfig = platforms[platform] && platforms[platform].linkConfig && platforms[platform].linkConfig();

      if (!linkConfig || !linkConfig.unlinkAssets || !project[platform]) {
        return;
      }

      _logger.default.info(`Unlinking assets from ${platform} project`); // $FlowFixMe: We check for platorm existence on line 150


      linkConfig.unlinkAssets(assets, project[platform]);
    });

    _logger.default.info(`${packageName} assets has been successfully unlinked from your project`);
  }).catch(err => {
    _logger.default.error(`It seems something went wrong while unlinking. Error:\n${err.message}`);

    throw err;
  });
}

var _default = {
  func: unlink,
  description: 'unlink native dependency',
  name: 'unlink <packageName>'
};
exports.default = _default;