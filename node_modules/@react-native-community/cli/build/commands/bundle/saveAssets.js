"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _mkdirp() {
  const data = _interopRequireDefault(require("mkdirp"));

  _mkdirp = function () {
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

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

var _filterPlatformAssetScales = _interopRequireDefault(require("./filterPlatformAssetScales"));

var _getAssetDestPathAndroid = _interopRequireDefault(require("./getAssetDestPathAndroid"));

var _getAssetDestPathIOS = _interopRequireDefault(require("./getAssetDestPathIOS"));

var _logger = _interopRequireDefault(require("../../tools/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
function saveAssets(assets, platform, assetsDest) {
  if (!assetsDest) {
    _logger.default.warn('Assets destination folder is not set, skipping...');

    return Promise.resolve();
  }

  const getAssetDestPath = platform === 'android' ? _getAssetDestPathAndroid.default : _getAssetDestPathIOS.default;
  const filesToCopy = Object.create(null); // Map src -> dest

  assets.forEach(asset => {
    const validScales = new Set((0, _filterPlatformAssetScales.default)(platform, asset.scales));
    asset.scales.forEach((scale, idx) => {
      if (!validScales.has(scale)) {
        return;
      }

      const src = asset.files[idx];

      const dest = _path().default.join(assetsDest, getAssetDestPath(asset, scale));

      filesToCopy[src] = dest;
    });
  });
  return copyAll(filesToCopy);
}

function copyAll(filesToCopy) {
  const queue = Object.keys(filesToCopy);

  if (queue.length === 0) {
    return Promise.resolve();
  }

  _logger.default.info(`Copying ${queue.length} asset files`);

  return new Promise((resolve, reject) => {
    const copyNext = error => {
      if (error) {
        reject(error);
        return;
      }

      if (queue.length === 0) {
        _logger.default.info('Done copying assets');

        resolve();
      } else {
        const src = queue.shift();
        const dest = filesToCopy[src];
        copy(src, dest, copyNext);
      }
    };

    copyNext();
  });
}

function copy(src, dest, callback) {
  const destDir = _path().default.dirname(dest);

  (0, _mkdirp().default)(destDir, err => {
    if (err) {
      callback(err);
      return;
    }

    _fs().default.createReadStream(src).pipe(_fs().default.createWriteStream(dest)).on('finish', callback);
  });
}

var _default = saveAssets;
exports.default = _default;