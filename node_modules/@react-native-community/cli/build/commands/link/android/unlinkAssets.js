"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unlinkAssetsAndroid;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
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

var _groupFilesByType = _interopRequireDefault(require("../groupFilesByType"));

var _logger = _interopRequireDefault(require("../../../tools/logger"));

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

/**
 * Copies each file from an array of assets provided to targetPath directory
 *
 * For now, the only types of files that are handled are:
 * - Fonts (otf, ttf) - copied to targetPath/fonts under original name
 */
function unlinkAssetsAndroid(files, project) {
  const assets = (0, _groupFilesByType.default)(files);

  _logger.default.debug(`Assets path: ${project.assetsPath}`);

  (assets.font || []).forEach(file => {
    const filePath = _path().default.join(project.assetsPath, 'fonts', _path().default.basename(file));

    if (_fs().default.existsSync(filePath)) {
      _logger.default.debug(`Removing asset ${filePath}`);

      _fs().default.unlinkSync(filePath);
    }
  });
}