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
 */

/**
 * Starts adb logcat
 */
async function logAndroid() {
  const adbPath = process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/platform-tools/adb` : 'adb';
  const adbArgs = ['logcat', '*:S', 'ReactNative:V', 'ReactNativeJS:V'];

  _logger.default.info(`Starting the logger (${adbPath} ${adbArgs.join(' ')})...`);

  const log = (0, _child_process().spawnSync)(adbPath, adbArgs, {
    stdio: 'inherit'
  });

  if (log.error !== null) {
    throw log.error;
  }
}

var _default = {
  name: 'log-android',
  description: 'starts adb logcat',
  func: logAndroid
};
exports.default = _default;