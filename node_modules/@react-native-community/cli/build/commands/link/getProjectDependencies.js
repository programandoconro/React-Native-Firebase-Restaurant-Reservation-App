"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProjectDependencies;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

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
 * List of projects that should not be treated as projects to be linked.
 *
 * That includes `react-native` itself and the CLI project (under its real and staging npm package).
 */
const EXCLUDED_PROJECTS = ['react-native', '@react-native-community/cli', 'react-native-local-cli-preview'];
/**
 * Returns an array of dependencies that should be linked/checked.
 */

function getProjectDependencies(cwd) {
  const pkgJson = require(_path().default.join(cwd, './package.json'));

  return Object.keys(pkgJson.dependencies || {}).filter(name => EXCLUDED_PROJECTS.includes(name) === false);
}