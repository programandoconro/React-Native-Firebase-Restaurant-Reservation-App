"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDevToolsMiddleware;

var _launchChrome = _interopRequireDefault(require("../launchChrome"));

var _logger = _interopRequireDefault(require("../../../tools/logger"));

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
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
function launchChromeDevTools(port, args = '') {
  const debuggerURL = `http://localhost:${port}/debugger-ui${args}`;

  _logger.default.info('Launching Dev Tools...');

  (0, _launchChrome.default)(debuggerURL);
}

function escapePath(pathname) {
  // " Can escape paths with spaces in OS X, Windows, and *nix
  return `"${pathname}"`;
}

function launchDevTools({
  port,
  watchFolders
}, isChromeConnected) {
  // Explicit config always wins
  const customDebugger = process.env.REACT_DEBUGGER;

  if (customDebugger) {
    startCustomDebugger({
      watchFolders,
      customDebugger
    });
  } else if (!isChromeConnected()) {
    // Dev tools are not yet open; we need to open a session
    launchChromeDevTools(port);
  }
}

function startCustomDebugger({
  watchFolders,
  customDebugger
}) {
  const folders = watchFolders.map(escapePath).join(' ');
  const command = `${customDebugger} ${folders}`;
  console.log('Starting custom debugger by executing:', command);
  (0, _child_process().exec)(command, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('Error while starting custom debugger:', error);
    }
  });
}

function getDevToolsMiddleware(options, isChromeConnected) {
  return function devToolsMiddleware(req, res, next) {
    if (req.url === '/launch-safari-devtools') {
      // TODO: remove `logger.info` and dev tools binary
      _logger.default.info('We removed support for Safari dev-tools. ' + 'If you still need this, please let us know.');
    } else if (req.url === '/launch-chrome-devtools') {
      // TODO: Remove this case in the future
      _logger.default.info('The method /launch-chrome-devtools is deprecated. You are ' + ' probably using an application created with an older CLI with the ' + ' packager of a newer CLI. Please upgrade your application: ' + 'https://facebook.github.io/react-native/docs/upgrading.html');

      launchDevTools(options, isChromeConnected);
      res.end('OK');
    } else if (req.url === '/launch-js-devtools') {
      launchDevTools(options, isChromeConnected);
      res.end('OK');
    } else {
      next();
    }
  };
}