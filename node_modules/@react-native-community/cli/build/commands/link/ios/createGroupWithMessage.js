"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGroupWithMessage;

var _logger = _interopRequireDefault(require("../../../tools/logger"));

var _createGroup = _interopRequireDefault(require("./createGroup"));

var _getGroup = _interopRequireDefault(require("./getGroup"));

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
 * Given project and path of the group, it checks if a group exists at that path,
 * and deeply creates a group for that path if its does not already exist.
 *
 * Returns the existing or newly created group
 */
function createGroupWithMessage(project, path) {
  let group = (0, _getGroup.default)(project, path);

  if (!group) {
    group = (0, _createGroup.default)(project, path);

    _logger.default.warn(`Group '${path}' does not exist in your Xcode project. We have created it automatically for you.`);
  }

  return group;
}