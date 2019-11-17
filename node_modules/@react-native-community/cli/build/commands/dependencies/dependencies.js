"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _metro() {
  const data = _interopRequireDefault(require("metro"));

  _metro = function () {
    return data;
  };

  return data;
}

function _denodeify() {
  const data = _interopRequireDefault(require("denodeify"));

  _denodeify = function () {
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

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _util() {
  const data = _interopRequireDefault(require("util"));

  _util = function () {
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
 */
async function dependencies(argv, configPromise, args, packagerInstance) {
  const rootModuleAbsolutePath = args.entryFile;
  const config = await configPromise;

  if (!_fs().default.existsSync(rootModuleAbsolutePath)) {
    return Promise.reject(new Error(`File ${rootModuleAbsolutePath} does not exist`));
  }

  config.cacheStores = [];

  const relativePath = _path().default.relative(config.projectRoot, rootModuleAbsolutePath);

  const options = {
    platform: args.platform,
    entryFile: relativePath,
    dev: args.dev,
    minify: false,
    generateSourceMaps: !args.dev
  };
  const writeToFile = args.output;
  const outStream = writeToFile ? _fs().default.createWriteStream(args.output) : process.stdout;
  const deps = packagerInstance ? await packagerInstance.getOrderedDependencyPaths(options) : await _metro().default.getOrderedDependencyPaths(config, options);
  deps.forEach(modulePath => {
    // Temporary hack to disable listing dependencies not under this directory.
    // Long term, we need either
    // (a) JS code to not depend on anything outside this directory, or
    // (b) Come up with a way to declare this dependency in Buck.
    const isInsideProjectRoots = config.watchFolders.filter(root => modulePath.startsWith(root)).length > 0;

    if (isInsideProjectRoots) {
      outStream.write(`${modulePath}\n`);
    }
  });
  return writeToFile ? (0, _denodeify().default)(outStream.end).bind(outStream)() : Promise.resolve();
}

var _default = {
  name: 'dependencies',
  description: 'lists dependencies',
  func: _util().default.deprecate(dependencies, 'dependencies command was moved to metro, and will be removed from cli in next release'),
  options: [{
    command: '--entry-file <path>',
    description: 'Absolute path to the root JS file'
  }, {
    command: '--output [path]',
    description: 'File name where to store the output, ex. /tmp/dependencies.txt'
  }, {
    command: '--platform [extension]',
    description: 'The platform extension used for selecting modules'
  }, {
    command: '--transformer [path]',
    description: 'Specify a custom transformer to be used'
  }, {
    command: '--max-workers [number]',
    description: 'Specifies the maximum number of workers the worker-pool ' + 'will spawn for transforming files. This defaults to the number of the ' + 'cores available on your machine.',
    parse: workers => Number(workers)
  }, {
    command: '--dev [boolean]',
    description: 'If false, skip all dev-only code path',
    parse: val => val !== 'false',
    default: true
  }, {
    command: '--verbose',
    description: 'Enables logging',
    default: false
  }]
};
exports.default = _default;