"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _envinfo() {
  const data = _interopRequireDefault(require("envinfo"));

  _envinfo = function () {
    return data;
  };

  return data;
}

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
const info = function getInfo(argv, ctx, options) {
  try {
    _envinfo().default.run({
      System: ['OS', 'CPU', 'Memory', 'Shell'],
      Binaries: ['Node', 'Yarn', 'npm', 'Watchman'],
      IDEs: ['Xcode', 'Android Studio'],
      SDKs: ['iOS SDK', 'Android SDK'],
      npmPackages: typeof options.packages === 'string' && !options.packages.includes('*') || !options.packages ? ['react', 'react-native'].concat((options.packages || '').split(',')) : options.packages,
      npmGlobalPackages: '*react-native*'
    }, {
      clipboard: !!options.clipboard,
      title: 'React Native Environment Info'
    }).then(_logger.default.info).catch(err => {
      _logger.default.error(`Unable to print environment info.\n${err}`);
    });
  } catch (err) {
    _logger.default.error(`Unable to print environment info.\n${err}`);
  }
};

var _default = {
  name: 'info',
  description: 'Get relevant version info about OS, toolchain and libraries',
  options: [{
    command: '--packages [string]',
    description: 'Which packages from your package.json to include, in addition to the default React Native and React versions.'
  }, {
    command: '--clipboard [boolean]',
    description: 'Automagically copy the environment report output to the clipboard'
  }],
  examples: [{
    desc: 'Get standard version info',
    cmd: 'react-native info'
  }, {
    desc: 'Get standard version info & specified package versions',
    cmd: 'react-native info --packages jest,eslint'
  }, {
    desc: 'Get standard version info & globbed package versions',
    cmd: 'react-native info --packages "*react*"'
  }, {
    desc: 'Get standard version info & all package versions',
    cmd: 'react-native info --packages'
  }],
  func: info
};
exports.default = _default;