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

function _metroCore() {
  const data = require("metro-core");

  _metroCore = function () {
    return data;
  };

  return data;
}

function _morgan() {
  const data = _interopRequireDefault(require("morgan"));

  _morgan = function () {
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

var _logger = _interopRequireDefault(require("../../tools/logger"));

var _messageSocket = _interopRequireDefault(require("./messageSocket"));

var _webSocketProxy = _interopRequireDefault(require("./webSocketProxy"));

var _MiddlewareManager = _interopRequireDefault(require("./middleware/MiddlewareManager"));

var _loadMetroConfig = _interopRequireDefault(require("../../tools/loadMetroConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
async function runServer(argv, ctx, args) {
  const terminal = new (_metroCore().Terminal)(process.stdout);
  const ReporterImpl = getReporterImpl(args.customLogReporterPath || null);
  const reporter = new ReporterImpl(terminal);
  const metroConfig = await (0, _loadMetroConfig.default)(ctx, {
    config: args.config,
    maxWorkers: args.maxWorkers,
    port: args.port,
    resetCache: args.resetCache,
    watchFolders: args.watchFolders,
    projectRoot: ctx.root,
    sourceExts: args.sourceExts,
    reporter
  });

  if (args.assetPlugins) {
    metroConfig.transformer.assetPlugins = args.assetPlugins.map(plugin => require.resolve(plugin));
  }

  const middlewareManager = new _MiddlewareManager.default({
    host: args.host,
    port: metroConfig.server.port,
    watchFolders: metroConfig.watchFolders
  });
  middlewareManager.getConnectInstance().use((0, _morgan().default)('combined', !_logger.default.isVerbose() && {
    skip: (req, res) => res.statusCode < 400
  }));
  metroConfig.watchFolders.forEach(middlewareManager.serveStatic.bind(middlewareManager));

  metroConfig.server.enhanceMiddleware = middleware => middlewareManager.getConnectInstance().use(middleware);

  const serverInstance = await _metro().default.runServer(metroConfig, {
    host: args.host,
    secure: args.https,
    secureCert: args.cert,
    secureKey: args.key,
    hmrEnabled: true
  });

  const wsProxy = _webSocketProxy.default.attachToServer(serverInstance, '/debugger-proxy');

  const ms = _messageSocket.default.attachToServer(serverInstance, '/message');

  middlewareManager.attachDevToolsSocket(wsProxy);
  middlewareManager.attachDevToolsSocket(ms);
  middlewareManager.getConnectInstance().use('/reload', (req, res) => {
    ms.broadcast('reload', null);
    res.end('OK');
  }); // In Node 8, the default keep-alive for an HTTP connection is 5 seconds. In
  // early versions of Node 8, this was implemented in a buggy way which caused
  // some HTTP responses (like those containing large JS bundles) to be
  // terminated early.
  //
  // As a workaround, arbitrarily increase the keep-alive from 5 to 30 seconds,
  // which should be enough to send even the largest of JS bundles.
  //
  // For more info: https://github.com/nodejs/node/issues/13391
  //

  serverInstance.keepAliveTimeout = 30000;
}

function getReporterImpl(customLogReporterPath) {
  if (customLogReporterPath == null) {
    return require('metro/src/lib/TerminalReporter');
  }

  try {
    // First we let require resolve it, so we can require packages in node_modules
    // as expected. eg: require('my-package/reporter');
    return require(customLogReporterPath);
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    } // If that doesn't work, then we next try relative to the cwd, eg:
    // require('./reporter');


    return require(_path().default.resolve(customLogReporterPath));
  }
}

var _default = runServer;
exports.default = _default;