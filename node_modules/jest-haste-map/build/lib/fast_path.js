'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.relative = relative;
exports.resolve = resolve;

var _path;

function _load_path() {
  return (_path = _interopRequireDefault(require('path')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

// rootDir and filename must be absolute paths (resolved)
function relative(rootDir, filename) {
  return filename.indexOf(rootDir + (_path || _load_path()).default.sep) === 0
    ? filename.substr(rootDir.length + 1)
    : (_path || _load_path()).default.relative(rootDir, filename);
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const INDIRECTION_FRAGMENT = '..' + (_path || _load_path()).default.sep;

// rootDir must be an absolute path and relativeFilename must be simple
// (e.g.: foo/bar or ../foo/bar, but never ./foo or foo/../bar)
function resolve(rootDir, relativeFilename) {
  return relativeFilename.indexOf(INDIRECTION_FRAGMENT) === 0
    ? (_path || _load_path()).default.resolve(rootDir, relativeFilename)
    : rootDir + (_path || _load_path()).default.sep + relativeFilename;
}
