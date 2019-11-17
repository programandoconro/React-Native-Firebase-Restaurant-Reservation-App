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

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

var _copyProjectTemplateAndReplace = _interopRequireDefault(require("../../tools/generator/copyProjectTemplateAndReplace"));

var _logger = _interopRequireDefault(require("../../tools/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/**
 * The eject command re-creates the `android` and `ios` native folders. Because native code can be
 * difficult to maintain, this new script allows an `app.json` to be defined for the project, which
 * is used to configure the native app.
 *
 * The `app.json` config may contain the following keys:
 *
 * - `name` - The short name used for the project, should be TitleCase
 * - `displayName` - The app's name on the home screen
 */
function eject() {
  const doesIOSExist = _fs().default.existsSync(_path().default.resolve('ios'));

  const doesAndroidExist = _fs().default.existsSync(_path().default.resolve('android'));

  if (doesIOSExist && doesAndroidExist) {
    _logger.default.error('Both the iOS and Android folders already exist! Please delete `ios` and/or `android` ' + 'before ejecting.');

    process.exit(1);
  }

  let appConfig = null;

  try {
    appConfig = require(_path().default.resolve('app.json'));
  } catch (e) {
    _logger.default.error('Eject requires an `app.json` config file to be located at ' + `${_path().default.resolve('app.json')}, and it must at least specify a \`name\` for the project ` + "name, and a `displayName` for the app's home screen label.");

    process.exit(1);
  }

  const appName = appConfig.name;

  if (!appName) {
    _logger.default.error('App `name` must be defined in the `app.json` config file to define the project name. ' + 'It must not contain any spaces or dashes.');

    process.exit(1);
  }

  const displayName = appConfig.displayName;

  if (!displayName) {
    _logger.default.error('App `displayName` must be defined in the `app.json` config file, to define the label ' + 'of the app on the home screen.');

    process.exit(1);
  }

  const templateOptions = {
    displayName
  };

  if (!doesIOSExist) {
    _logger.default.info('Generating the iOS folder.');

    (0, _copyProjectTemplateAndReplace.default)(_path().default.resolve('node_modules', 'react-native', 'template', 'ios'), _path().default.resolve('ios'), appName, templateOptions);
  }

  if (!doesAndroidExist) {
    _logger.default.info('Generating the Android folder.');

    (0, _copyProjectTemplateAndReplace.default)(_path().default.resolve('node_modules', 'react-native', 'template', 'android'), _path().default.resolve('android'), appName, templateOptions);
  }
}

var _default = {
  name: 'eject',
  description: 'Re-create the iOS and Android folders and native code',
  func: eject,
  options: []
};
exports.default = _default;