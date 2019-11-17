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

function _minimist() {
  const data = _interopRequireDefault(require("minimist"));

  _minimist = function () {
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

function _process() {
  const data = _interopRequireDefault(require("process"));

  _process = function () {
    return data;
  };

  return data;
}

var _printRunInstructions = _interopRequireDefault(require("../../tools/generator/printRunInstructions"));

var _templates = require("../../tools/generator/templates");

var PackageManager = _interopRequireWildcard(require("../../tools/PackageManager"));

var _logger = _interopRequireDefault(require("../../tools/logger"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
 * Creates the template for a React Native project given the provided
 * parameters:
 * @param projectDir Templates will be copied here.
 * @param argsOrName Project name or full list of custom arguments
 *                   for the generator.
 * @param options Command line options passed from the react-native-cli directly.
 *                E.g. `{ version: '0.43.0', template: 'navigation' }`
 */
function init(projectDir, argsOrName) {
  const args = Array.isArray(argsOrName) ? argsOrName // argsOrName was e.g. ['AwesomeApp', '--verbose']
  : [argsOrName].concat(_process().default.argv.slice(4)); // argsOrName was e.g. 'AwesomeApp'
  // args array is e.g. ['AwesomeApp', '--verbose', '--template', 'navigation']

  if (!args || args.length === 0) {
    _logger.default.error('react-native init requires a project name.');

    return;
  }

  const newProjectName = args[0];
  const options = (0, _minimist().default)(args);

  _logger.default.info(`Setting up new React Native app in ${projectDir}`);

  generateProject(projectDir, newProjectName, options);
}
/**
 * Generates a new React Native project based on the template.
 * @param Absolute path at which the project folder should be created.
 * @param options Command line arguments parsed by minimist.
 */


function generateProject(destinationRoot, newProjectName, options) {
  const pkgJson = require('react-native/package.json');

  const reactVersion = pkgJson.peerDependencies.react;
  PackageManager.setProjectDir(destinationRoot);
  (0, _templates.createProjectFromTemplate)(destinationRoot, newProjectName, options.template, destinationRoot);

  _logger.default.info('Adding required dependencies');

  PackageManager.install([`react@${reactVersion}`]);

  _logger.default.info('Adding required dev dependencies');

  PackageManager.installDev(['@babel/core', '@babel/runtime', 'jest', 'babel-jest', 'metro-react-native-babel-preset', `react-test-renderer@${reactVersion}`]);
  addJestToPackageJson(destinationRoot);
  (0, _printRunInstructions.default)(destinationRoot, newProjectName);
}
/**
 * Add Jest-related stuff to package.json, which was created by the react-native-cli.
 */


function addJestToPackageJson(destinationRoot) {
  const packageJSONPath = _path().default.join(destinationRoot, 'package.json');

  const packageJSON = JSON.parse(_fs().default.readFileSync(packageJSONPath));
  packageJSON.scripts.test = 'jest';
  packageJSON.jest = {
    preset: 'react-native'
  };

  _fs().default.writeFileSync(packageJSONPath, `${JSON.stringify(packageJSON, null, 2)}\n`);
}

var _default = init;
exports.default = _default;