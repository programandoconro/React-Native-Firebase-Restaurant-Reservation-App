"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
var _default = (url, middleware) => (req, res, next) => {
  if (req.url === url || req.url.startsWith(`${url}/`)) {
    middleware(req, res, next);
  } else {
    next();
  }
};

exports.default = _default;