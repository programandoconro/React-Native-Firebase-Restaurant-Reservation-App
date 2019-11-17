"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _copyAndReplace = _interopRequireDefault(require("../../tools/copyAndReplace"));

var _isValidPackageName = _interopRequireDefault(require("../../tools/isValidPackageName"));

var _walk = _interopRequireDefault(require("../../tools/walk"));

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

/**
 * Creates a new native library with the given name
 */
async function library(argv, ctx, args) {
  if (!(0, _isValidPackageName.default)(args.name)) {
    throw new Error(`${args.name} is not a valid name for a project. Please use a valid ` + 'identifier name (alphanumeric).');
  }

  const libraries = _path().default.resolve(ctx.root, 'Libraries');

  const libraryDest = _path().default.resolve(libraries, args.name);

  const source = _path().default.resolve('node_modules', 'react-native', 'Libraries', 'Sample');

  if (!_fs().default.existsSync(libraries)) {
    _fs().default.mkdirSync(libraries);
  }

  if (_fs().default.existsSync(libraryDest)) {
    throw new Error(`Library already exists in ${libraryDest}`);
  }

  (0, _walk.default)(source).forEach(f => {
    if (f.indexOf('project.xcworkspace') !== -1 || f.indexOf('.xcodeproj/xcuserdata') !== -1) {
      return;
    }

    const dest = _path().default.relative(source, f.replace(/Sample/g, args.name).replace(/^_/, '.'));

    (0, _copyAndReplace.default)(_path().default.resolve(source, f), _path().default.resolve(libraryDest, dest), {
      Sample: args.name
    });
  });

  _logger.default.info(`Created library in ${libraryDest}.
Now it needs to be linked in Xcode:
https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content`);
}

var _default = {
  name: 'new-library',
  func: library,
  description: 'generates a native library bridge',
  options: [{
    command: '--name <string>',
    description: 'name of the library to generate',
    default: null
  }]
};
exports.default = _default;