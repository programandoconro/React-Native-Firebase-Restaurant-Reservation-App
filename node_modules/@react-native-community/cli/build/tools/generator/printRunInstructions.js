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

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
function printRunInstructions(projectDir, projectName) {
  const absoluteProjectDir = _path().default.resolve(projectDir);

  const xcodeProjectPath = `${_path().default.resolve(projectDir, 'ios', projectName)}.xcodeproj`;

  const relativeXcodeProjectPath = _path().default.relative(process.cwd(), xcodeProjectPath);

  _logger.default.log(`
  ${_chalk().default.cyan(`Run instructions for ${_chalk().default.bold('iOS')}`)}:
    • cd ${absoluteProjectDir} && react-native run-ios
    - or -
    • Open ${relativeXcodeProjectPath} in Xcode
    • Hit the Run button

  ${_chalk().default.green(`Run instructions for ${_chalk().default.bold('Android')}`)}:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd ${absoluteProjectDir} && react-native run-android
`);
}

var _default = printRunInstructions;
exports.default = _default;