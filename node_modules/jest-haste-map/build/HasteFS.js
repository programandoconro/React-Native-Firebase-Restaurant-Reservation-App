'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fast_path;

function _load_fast_path() {
  return (_fast_path = _interopRequireWildcard(require('./lib/fast_path')));
}

var _micromatch;

function _load_micromatch() {
  return (_micromatch = _interopRequireDefault(require('micromatch')));
}

var _constants;

function _load_constants() {
  return (_constants = _interopRequireDefault(require('./constants')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

class HasteFS {
  constructor(_ref) {
    let rootDir = _ref.rootDir,
      files = _ref.files;

    this._rootDir = rootDir;
    this._files = files;
  }

  getModuleName(file) {
    const fileMetadata = this._getFileData(file);
    return (
      (fileMetadata &&
        fileMetadata[(_constants || _load_constants()).default.ID]) ||
      null
    );
  }

  getDependencies(file) {
    const fileMetadata = this._getFileData(file);
    return (
      (fileMetadata &&
        fileMetadata[(_constants || _load_constants()).default.DEPENDENCIES]) ||
      null
    );
  }

  getSha1(file) {
    const fileMetadata = this._getFileData(file);
    return (
      (fileMetadata &&
        fileMetadata[(_constants || _load_constants()).default.SHA1]) ||
      null
    );
  }

  exists(file) {
    return this._getFileData(file) != null;
  }

  getAllFiles() {
    return Array.from(this.getAbsoluteFileIterator());
  }

  getFileIterator() {
    return this._files.keys();
  }

  *getAbsoluteFileIterator() {
    for (const file of this._files.keys()) {
      yield (_fast_path || _load_fast_path()).resolve(this._rootDir, file);
    }
  }

  matchFiles(pattern) {
    if (!(pattern instanceof RegExp)) {
      pattern = new RegExp(pattern);
    }
    const files = [];
    for (const file of this.getAbsoluteFileIterator()) {
      if (pattern.test(file)) {
        files.push(file);
      }
    }
    return files;
  }

  matchFilesWithGlob(globs, root) {
    const files = new Set();
    for (const file of this.getAbsoluteFileIterator()) {
      const filePath = root
        ? (_fast_path || _load_fast_path()).relative(root, file)
        : file;
      if (
        (0, (_micromatch || _load_micromatch()).default)([filePath], globs)
          .length
      ) {
        files.add(file);
      }
    }
    return files;
  }

  _getFileData(file) {
    const relativePath = (_fast_path || _load_fast_path()).relative(
      this._rootDir,
      file
    );
    return this._files.get(relativePath);
  }
}
exports.default = HasteFS;
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
