"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _findPlugins = _interopRequireDefault(require("../tools/findPlugins"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This file exists only because RN 0.59.0 stable consumes it and we don't want
 * to introduce a breaking change.
 * See consumer: https://github.com/facebook/react-native/blob/7c73f2bb5a0f97902f469bc043681e79e161aac3/jest/hasteImpl.js#L28
 * @todo: remove in 2.0
 *
 * 
 */
var _default = _findPlugins.default;
exports.default = _default;