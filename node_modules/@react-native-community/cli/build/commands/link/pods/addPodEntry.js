"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addPodEntry;

var _logger = _interopRequireDefault(require("../../../tools/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
function addPodEntry(podLines, linesToAddEntry, podName, nodePath) {
  const newEntry = `pod '${podName}', :path => '../node_modules/${nodePath}'\n`;

  if (!linesToAddEntry) {
    return;
  }

  if (Array.isArray(linesToAddEntry)) {
    linesToAddEntry.map(({
      line,
      indentation
    }, idx) => {
      _logger.default.debug(`Adding ${podName} to Pod file"`);

      podLines.splice(line + idx, 0, getLineToAdd(newEntry, indentation));
    });
  } else {
    const {
      line,
      indentation
    } = linesToAddEntry;

    _logger.default.debug(`Adding ${podName} to Pod file"`);

    podLines.splice(line, 0, getLineToAdd(newEntry, indentation));
  }
}

function getLineToAdd(newEntry, indentation) {
  const spaces = Array(indentation + 1).join(' ');
  return spaces + newEntry;
}