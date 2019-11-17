"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYarnVersionIfAvailable = getYarnVersionIfAvailable;
exports.isProjectUsingYarn = isProjectUsingYarn;

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
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

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _logger = _interopRequireDefault(require("./logger"));

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
 * Use Yarn if available, it's much faster than the npm client.
 * Return the version of yarn installed on the system, null if yarn is not available.
 */
function getYarnVersionIfAvailable() {
  let yarnVersion;

  try {
    // execSync returns a Buffer -> convert to string
    yarnVersion = ((0, _child_process().execSync)('yarn --version', {
      stdio: [0, 'pipe', 'ignore']
    }).toString() || '').trim();
  } catch (error) {
    return null;
  } // yarn < 0.16 has a 'missing manifest' bug


  try {
    if (_semver().default.gte(yarnVersion, '0.16.0')) {
      return yarnVersion;
    }

    return null;
  } catch (error) {
    _logger.default.error(`Cannot parse yarn version: ${yarnVersion}`);

    return null;
  }
}
/**
 * Check that 'react-native init' itself used yarn to install React Native.
 * When using an old global react-native-cli@1.0.0 (or older), we don't want
 * to install React Native with npm, and React + Jest with yarn.
 * Let's be safe and not mix yarn and npm in a single project.
 * @param projectDir e.g. /Users/martin/AwesomeApp
 */


function isProjectUsingYarn(projectDir) {
  return _fs().default.existsSync(_path().default.join(projectDir, 'yarn.lock'));
}