"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _runServer = _interopRequireDefault(require("./runServer"));

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
var _default = {
  name: 'start',
  func: _runServer.default,
  description: 'starts the webserver',
  options: [{
    command: '--port [number]',
    parse: val => Number(val)
  }, {
    command: '--host [string]',
    default: ''
  }, {
    command: '--watchFolders [list]',
    description: 'Specify any additional folders to be added to the watch list',
    parse: val => val.split(',')
  }, {
    command: '--assetPlugins [list]',
    description: 'Specify any additional asset plugins to be used by the packager by full filepath',
    parse: val => val.split(',')
  }, {
    command: '--assetExts [list]',
    description: 'Specify any additional asset extensions to be used by the packager',
    parse: val => val.split(',')
  }, {
    command: '--sourceExts [list]',
    description: 'Specify any additional source extensions to be used by the packager',
    parse: val => val.split(',')
  }, {
    command: '--platforms [list]',
    description: 'Specify any additional platforms to be used by the packager',
    parse: val => val.split(',')
  }, {
    command: '--providesModuleNodeModules [list]',
    description: 'Specify any npm packages that import dependencies with providesModule',
    parse: val => val.split(',')
  }, {
    command: '--max-workers [number]',
    description: 'Specifies the maximum number of workers the worker-pool ' + 'will spawn for transforming files. This defaults to the number of the ' + 'cores available on your machine.',
    parse: workers => Number(workers)
  }, {
    command: '--skipflow',
    description: 'Disable flow checks'
  }, {
    command: '--nonPersistent',
    description: 'Disable file watcher'
  }, {
    command: '--transformer [string]',
    description: 'Specify a custom transformer to be used'
  }, {
    command: '--reset-cache, --resetCache',
    description: 'Removes cached files'
  }, {
    command: '--custom-log-reporter-path, --customLogReporterPath [string]',
    description: 'Path to a JavaScript file that exports a log reporter as a replacement for TerminalReporter'
  }, {
    command: '--verbose',
    description: 'Enables logging'
  }, {
    command: '--https',
    description: 'Enables https connections to the server'
  }, {
    command: '--key [path]',
    description: 'Path to custom SSL key'
  }, {
    command: '--cert [path]',
    description: 'Path to custom SSL cert'
  }, {
    command: '--config [string]',
    description: 'Path to the CLI configuration file',
    parse: val => _path().default.resolve(val)
  }]
};
exports.default = _default;