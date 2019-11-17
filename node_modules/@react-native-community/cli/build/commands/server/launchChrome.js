"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _opn() {
  const data = _interopRequireDefault(require("opn"));

  _opn = function () {
    return data;
  };

  return data;
}

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
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
 * 
 */
function commandExistsUnixSync(commandName) {
  try {
    const stdout = (0, _child_process().execSync)(`command -v ${commandName} 2>/dev/null` + ` && { echo >&1 '${commandName} found'; exit 0; }`);
    return !!stdout;
  } catch (error) {
    return false;
  }
}

function getChromeAppName() {
  switch (process.platform) {
    case 'darwin':
      return 'google chrome';

    case 'win32':
      return 'chrome';

    case 'linux':
      if (commandExistsUnixSync('google-chrome')) {
        return 'google-chrome';
      }

      if (commandExistsUnixSync('chromium-browser')) {
        return 'chromium-browser';
      }

      return 'chromium';

    default:
      return 'google-chrome';
  }
}

function launchChrome(url) {
  (0, _opn().default)(url, {
    app: [getChromeAppName()]
  }, err => {
    if (err) {
      _logger.default.error('Google Chrome exited with error:', err);
    }
  });
}

var _default = launchChrome;
exports.default = _default;