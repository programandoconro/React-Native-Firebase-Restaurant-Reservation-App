"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _logger = _interopRequireDefault(require("../../tools/logger"));

var _copyProjectTemplateAndReplace = _interopRequireDefault(require("../../tools/generator/copyProjectTemplateAndReplace"));

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

/**
 * Migrate application to a new version of React Native.
 * See http://facebook.github.io/react-native/docs/upgrading.html
 */
function validateAndUpgrade(argv, ctx) {
  const projectDir = ctx.root;
  const packageJSON = JSON.parse(_fs().default.readFileSync(_path().default.resolve(projectDir, 'package.json'), 'utf8'));
  warn('You should consider using the new upgrade tool based on Git. It ' + 'makes upgrades easier by resolving most conflicts automatically.\n' + 'To use it:\n' + '- Go back to the old version of React Native\n' + '- Run "npm install -g react-native-git-upgrade"\n' + '- Run "react-native-git-upgrade"\n' + 'See https://facebook.github.io/react-native/docs/upgrading.html');
  const projectName = packageJSON.name;

  if (!projectName) {
    warn('Your project needs to have a name, declared in package.json, ' + 'such as "name": "AwesomeApp". Please add a project name. Aborting.');
    return;
  }

  const version = packageJSON.dependencies['react-native'];

  if (!version) {
    warn('Your "package.json" file doesn\'t seem to declare "react-native" as ' + 'a dependency. Nothing to upgrade. Aborting.');
    return;
  }

  if (version === 'latest' || version === '*') {
    warn('Some major releases introduce breaking changes.\n' + 'Please use a caret version number in your "package.json" file \n' + 'to avoid breakage. Use e.g. react-native: ^0.38.0. Aborting.');
    return;
  }

  const installed = JSON.parse(_fs().default.readFileSync(_path().default.resolve(projectDir, 'node_modules/react-native/package.json'), 'utf8'));

  if (!_semver().default.satisfies(installed.version, version)) {
    warn('react-native version in "package.json" doesn\'t match ' + 'the installed version in "node_modules".\n' + 'Try running "npm install" to fix this. Aborting.');
    return;
  }

  const v = version.replace(/^(~|\^|=)/, '').replace(/x/i, '0');

  if (!_semver().default.valid(v)) {
    warn("A valid version number for 'react-native' is not specified in your " + "'package.json' file. Aborting.");
    return;
  }

  _logger.default.info(`Upgrading project to react-native v${installed.version}\n` + 'Check out the release notes and breaking changes: ' + `https://github.com/facebook/react-native/releases/tag/v${_semver().default.major(v)}.${_semver().default.minor(v)}.0`); // >= v0.21.0, we require react to be a peer dependency


  if (_semver().default.gte(v, '0.21.0') && !packageJSON.dependencies.react) {
    warn('Your "package.json" file doesn\'t seem to have "react" as a dependency.\n' + '"react" was changed from a dependency to a peer dependency in react-native v0.21.0.\n' + 'Therefore, it\'s necessary to include "react" in your project\'s dependencies.\n' + 'Please run "npm install --save react", then re-run "react-native upgrade".\n');
    return;
  }

  if (_semver().default.satisfies(v, '~0.26.0')) {
    warn('React Native 0.26 introduced some breaking changes to the native files on iOS. You can\n' + 'perform them manually by checking the release notes or use "rnpm" ' + 'to do it automatically.\n' + 'Just run:\n' + '"npm install -g rnpm && npm install rnpm-plugin-upgrade@0.26 --save-dev", ' + 'then run "rnpm upgrade".');
  }

  upgradeProjectFiles(projectDir, projectName);

  _logger.default.info(`Successfully upgraded this project to react-native v${installed.version}`);
}
/**
 * Once all checks passed, upgrade the project files.
 */


function upgradeProjectFiles(projectDir, projectName) {
  // Just overwrite
  (0, _copyProjectTemplateAndReplace.default)(_path().default.dirname(require.resolve('react-native/template')), projectDir, projectName, {
    upgrade: true
  });
}

function warn(message) {
  _logger.default.warn(message);
}

const upgradeCommand = {
  name: 'upgrade',
  description: "upgrade your app's template files to the latest version; run this after " + 'updating the react-native version in your package.json and running npm install',
  func: validateAndUpgrade
};
var _default = upgradeCommand;
exports.default = _default;