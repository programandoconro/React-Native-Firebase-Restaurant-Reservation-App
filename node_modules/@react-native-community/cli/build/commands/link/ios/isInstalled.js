"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInstalled;

function _xcode() {
  const data = _interopRequireDefault(require("xcode"));

  _xcode = function () {
    return data;
  };

  return data;
}

var _getGroup = _interopRequireDefault(require("./getGroup"));

var _hasLibraryImported = _interopRequireDefault(require("./hasLibraryImported"));

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
 * Returns true if `xcodeproj` specified by dependencyConfig is present
 * in a top level `libraryFolder`
 */
function isInstalled(projectConfig, dependencyConfig) {
  const project = _xcode().default.project(projectConfig.pbxprojPath).parseSync();

  const libraries = (0, _getGroup.default)(project, projectConfig.libraryFolder);

  if (!libraries) {
    return false;
  }

  return (0, _hasLibraryImported.default)(libraries, dependencyConfig.projectName);
}