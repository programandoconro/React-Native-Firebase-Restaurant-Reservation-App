"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.func = void 0;

function _lodash() {
  const data = require("lodash");

  _lodash = function () {
    return data;
  };

  return data;
}

var _promiseWaterfall = _interopRequireDefault(require("./promiseWaterfall"));

var _logger = _interopRequireDefault(require("../../tools/logger"));

var _getDependencyConfig = _interopRequireDefault(require("./getDependencyConfig"));

var _commandStub = _interopRequireDefault(require("./commandStub"));

var _promisify = _interopRequireDefault(require("./promisify"));

var _getProjectConfig = _interopRequireDefault(require("./getProjectConfig"));

var _linkDependency = _interopRequireDefault(require("./linkDependency"));

var _linkAssets = _interopRequireDefault(require("./linkAssets"));

var _linkAll = _interopRequireDefault(require("./linkAll"));

var _findReactNativeScripts = _interopRequireDefault(require("../../tools/findReactNativeScripts"));

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

/**
 * Updates project and links all dependencies to it.
 *
 * @param args If optional argument [packageName] is provided,
 *             only that package is processed.
 */
function link([rawPackageName], ctx, opts) {
  let platforms;
  let project;

  try {
    platforms = (0, _getPlatforms.default)(ctx.root);

    _logger.default.debug('Available platforms: ' + `${Object.getOwnPropertyNames(platforms).map(platform => (0, _getPlatforms.getPlatformName)(platform)).join(', ')}`);

    if (opts.platforms) {
      platforms = (0, _lodash().pick)(platforms, opts.platforms);
    }

    _logger.default.debug('Targeted platforms: ' + `${Object.getOwnPropertyNames(platforms).map(platform => (0, _getPlatforms.getPlatformName)(platform)).join(', ')}`);

    project = (0, _getProjectConfig.default)(ctx, platforms);
  } catch (err) {
    _logger.default.error('No package found. Are you sure this is a React Native project?');

    return Promise.reject(err);
  }

  const hasProjectConfig = Object.keys(platforms).reduce((acc, key) => acc || key in project, false);

  if (!hasProjectConfig && (0, _findReactNativeScripts.default)()) {
    throw new Error('`react-native link [package]` can not be used in Create React Native App projects. ' + 'If you need to include a library that relies on custom native code, ' + 'you might have to eject first. ' + 'See https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md ' + 'for more information.');
  }

  if (rawPackageName === undefined) {
    _logger.default.debug('No package name provided, will attemp to link all possible packages.');

    return (0, _linkAll.default)(ctx, platforms, project);
  }

  _logger.default.debug(`Package to link: ${rawPackageName}`); // Trim the version / tag out of the package name (eg. package@latest)


  const packageName = rawPackageName.replace(/^(.+?)(@.+?)$/gi, '$1');
  const dependencyConfig = (0, _getDependencyConfig.default)(ctx, platforms, packageName);
  const tasks = [() => (0, _promisify.default)(dependencyConfig.commands.prelink || _commandStub.default), () => (0, _linkDependency.default)(platforms, project, dependencyConfig), () => (0, _promisify.default)(dependencyConfig.commands.postlink || _commandStub.default), () => (0, _linkAssets.default)(platforms, project, dependencyConfig.assets)];
  return (0, _promiseWaterfall.default)(tasks).catch(err => {
    _logger.default.error(`Something went wrong while linking. Error: ${err.message} \n` + 'Please file an issue here: https://github.com/react-native-community/react-native-cli/issues');

    throw err;
  });
}

const func = link;
exports.func = func;
var _default = {
  func: link,
  description: 'scope link command to certain platforms (comma-separated)',
  name: 'link [packageName]',
  options: [{
    command: '--platforms [list]',
    description: 'If you want to link dependencies only for specific platforms',
    parse: val => val.toLowerCase().split(',')
  }]
}; // link;

exports.default = _default;