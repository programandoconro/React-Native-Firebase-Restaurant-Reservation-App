"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _lodash() {
  const data = require("lodash");

  _lodash = function () {
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

var _getAssets = _interopRequireDefault(require("../../tools/getAssets"));

var _getProjectDependencies = _interopRequireDefault(require("./getProjectDependencies"));

var _getDependencyConfig = _interopRequireDefault(require("./getDependencyConfig"));

var _promiseWaterfall = _interopRequireDefault(require("./promiseWaterfall"));

var _commandStub = _interopRequireDefault(require("./commandStub"));

var _promisify = _interopRequireDefault(require("./promisify"));

var _linkAssets = _interopRequireDefault(require("./linkAssets"));

var _linkDependency = _interopRequireDefault(require("./linkDependency"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dedupeAssets = assets => (0, _lodash().uniqBy)(assets, asset => _path().default.basename(asset));

function linkAll(context, platforms, project) {
  const projectAssets = (0, _getAssets.default)(context.root);
  const dependencies = (0, _getProjectDependencies.default)(context.root);
  const depenendenciesConfig = dependencies.map(dependnecy => (0, _getDependencyConfig.default)(context, platforms, dependnecy));
  const assets = dedupeAssets(depenendenciesConfig.reduce((acc, dependency) => acc.concat(dependency.assets), projectAssets));
  const tasks = (0, _lodash().flatten)(depenendenciesConfig.map(config => [() => (0, _promisify.default)(config.commands.prelink || _commandStub.default), () => (0, _linkDependency.default)(platforms, project, config), () => (0, _promisify.default)(config.commands.postlink || _commandStub.default)])).concat([() => (0, _linkAssets.default)(platforms, project, assets)]);
  return (0, _promiseWaterfall.default)(tasks).catch(err => {
    _logger.default.error(`Something went wrong while linking. Error: ${err.message} \n` + 'Please file an issue here: https://github.com/react-native-community/react-native-cli/issues');

    throw err;
  });
}

var _default = linkAll;
exports.default = _default;