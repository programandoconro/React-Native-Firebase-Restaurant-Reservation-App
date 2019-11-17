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

var _adb = _interopRequireDefault(require("./adb"));

var _tryRunAdbReverse = _interopRequireDefault(require("./tryRunAdbReverse"));

var _tryLaunchAppOnDevice = _interopRequireDefault(require("./tryLaunchAppOnDevice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function getCommand(appFolder, command) {
  return appFolder ? `${appFolder}:${command}` : command;
}

function runOnAllDevices(args, cmd, packageNameWithSuffix, packageName, adbPath) {
  try {
    const gradleArgs = [];

    if (args.installDebug) {
      gradleArgs.push(getCommand(args.appFolder, args.installDebug));
    } else if (args.variant) {
      gradleArgs.push(`${getCommand(args.appFolder, 'install')}${args.variant[0].toUpperCase()}${args.variant.slice(1)}`);
    } else if (args.flavor) {
      _logger.default.warn('--flavor has been deprecated. Use --variant instead');

      gradleArgs.push(`${getCommand(args.appFolder, 'install')}${args.flavor[0].toUpperCase()}${args.flavor.slice(1)}`);
    } else {
      gradleArgs.push(getCommand(args.appFolder, 'installDebug'));
    }

    _logger.default.info(`Building and installing the app on the device (cd android && ${cmd} ${gradleArgs.join(' ')})...`);

    (0, _child_process().execFileSync)(cmd, gradleArgs, {
      stdio: [process.stdin, process.stdout, process.stderr]
    });
  } catch (e) {
    _logger.default.error('Could not install the app on the device, read the error above for details.\n' + 'Make sure you have an Android emulator running or a device connected and have\n' + 'set up your Android development environment:\n' + 'https://facebook.github.io/react-native/docs/getting-started.html'); // stderr is automatically piped from the gradle process, so the user
    // should see the error already, there is no need to do
    // `logger.info(e.stderr)`


    return Promise.reject(e);
  }

  const devices = _adb.default.getDevices(adbPath);

  if (devices && devices.length > 0) {
    devices.forEach(device => {
      (0, _tryRunAdbReverse.default)(args.port, device);
      (0, _tryLaunchAppOnDevice.default)(device, packageNameWithSuffix, packageName, adbPath, args.mainActivity);
    });
  } else {
    try {
      // If we cannot execute based on adb devices output, fall back to
      // shell am start
      const fallbackAdbArgs = ['shell', 'am', 'start', '-n', `${packageNameWithSuffix}/${packageName}.MainActivity`];

      _logger.default.info(`Starting the app (${adbPath} ${fallbackAdbArgs.join(' ')}...`);

      (0, _child_process().spawnSync)(adbPath, fallbackAdbArgs, {
        stdio: 'inherit'
      });
    } catch (e) {
      _logger.default.error('adb invocation failed. Do you have adb in your PATH?'); // stderr is automatically piped from the gradle process, so the user
      // should see the error already, there is no need to do
      // `logger.info(e.stderr)`


      return Promise.reject(e);
    }
  }
}

var _default = runOnAllDevices;
exports.default = _default;