"use strict";

require("./tools/gracefulifyFs");

var _cliEntry = _interopRequireDefault(require("./cliEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// gracefulify() has to be called before anything else runs
if (require.main === module) {
  _cliEntry.default.run();
}

module.exports = _cliEntry.default;