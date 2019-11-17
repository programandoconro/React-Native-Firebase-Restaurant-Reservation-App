"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPackageClassName;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _glob() {
  const data = _interopRequireDefault(require("glob"));

  _glob = function () {
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
 * Gets package's class name (class that implements ReactPackage)
 * by searching for its declaration in all Java/Kotlin files present in the folder
 *
 * @param {String} folder Folder to find java/kt files
 */
function getPackageClassName(folder) {
  const files = _glob().default.sync('**/+(*.java|*.kt)', {
    cwd: folder
  });

  const packages = files.map(filePath => _fs().default.readFileSync(_path().default.join(folder, filePath), 'utf8')).map(file => file.match(/class (.*) +(implements|:) ReactPackage/)).filter(match => match);
  return packages.length ? packages[0][1] : null;
}