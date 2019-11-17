"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _compression() {
  const data = _interopRequireDefault(require("compression"));

  _compression = function () {
    return data;
  };

  return data;
}

function _connect() {
  const data = _interopRequireDefault(require("connect"));

  _connect = function () {
    return data;
  };

  return data;
}

function _errorhandler() {
  const data = _interopRequireDefault(require("errorhandler"));

  _errorhandler = function () {
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

function _serveStatic() {
  const data = _interopRequireDefault(require("serve-static"));

  _serveStatic = function () {
    return data;
  };

  return data;
}

function _ws() {
  const data = require("ws");

  _ws = function () {
    return data;
  };

  return data;
}

var _indexPage = _interopRequireDefault(require("./indexPage"));

var _copyToClipBoardMiddleware = _interopRequireDefault(require("./copyToClipBoardMiddleware"));

var _getSecurityHeadersMiddleware = _interopRequireDefault(require("./getSecurityHeadersMiddleware"));

var _loadRawBodyMiddleware = _interopRequireDefault(require("./loadRawBodyMiddleware"));

var _openStackFrameInEditorMiddleware = _interopRequireDefault(require("./openStackFrameInEditorMiddleware"));

var _statusPageMiddleware = _interopRequireDefault(require("./statusPageMiddleware"));

var _systraceProfileMiddleware = _interopRequireDefault(require("./systraceProfileMiddleware"));

var _getDevToolsMiddleware = _interopRequireDefault(require("./getDevToolsMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @strict
 * 
 */
class MiddlewareManager {
  constructor(options) {
    const debuggerUIFolder = _path().default.join(__dirname, '..', 'debugger-ui');

    this.options = options;
    this.app = (0, _connect().default)().use(_getSecurityHeadersMiddleware.default).use(_loadRawBodyMiddleware.default).use((0, _compression().default)()).use('/debugger-ui', (0, _serveStatic().default)(debuggerUIFolder)).use((0, _openStackFrameInEditorMiddleware.default)(this.options)).use(_copyToClipBoardMiddleware.default).use(_statusPageMiddleware.default).use(_systraceProfileMiddleware.default).use(_indexPage.default).use((0, _errorhandler().default)());
  }

  serveStatic(folder) {
    this.app.use((0, _serveStatic().default)(folder));
  }

  getConnectInstance() {
    return this.app;
  }

  attachDevToolsSocket(socket) {
    this.app.use((0, _getDevToolsMiddleware.default)(this.options, () => socket.isChromeConnected()));
  }

}

exports.default = MiddlewareManager;