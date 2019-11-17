"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
    return data;
  };

  return data;
}

var _logger = _interopRequireDefault(require("../../tools/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function tryLaunchAppOnDevice(device, packageNameWithSuffix, packageName, adbPath, mainActivity) {
  try {
    const adbArgs = ['-s', device, 'shell', 'am', 'start', '-n', `${packageNameWithSuffix}/${packageName}.${mainActivity}`];

    _logger.default.info(`Starting the app on ${device} (${adbPath} ${adbArgs.join(' ')})...`);

    (0, _child_process().spawnSync)(adbPath, adbArgs, {
      stdio: 'inherit'
    });
  } catch (e) {
    _logger.default.error('adb invocation failed. Do you have adb in your PATH?');
  }
}

var _default = tryLaunchAppOnDevice;
exports.default = _default;