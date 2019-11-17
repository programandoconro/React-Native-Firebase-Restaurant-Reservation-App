"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommands = getCommands;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _findPlugins = _interopRequireDefault(require("../tools/findPlugins"));

var _logger = _interopRequireDefault(require("../tools/logger"));

var _server = _interopRequireDefault(require("./server/server"));

var _runIOS = _interopRequireDefault(require("./runIOS/runIOS"));

var _runAndroid = _interopRequireDefault(require("./runAndroid/runAndroid"));

var _library = _interopRequireDefault(require("./library/library"));

var _bundle = _interopRequireDefault(require("./bundle/bundle"));

var _ramBundle = _interopRequireDefault(require("./bundle/ramBundle"));

var _eject = _interopRequireDefault(require("./eject/eject"));

var _link = _interopRequireDefault(require("./link/link"));

var _unlink = _interopRequireDefault(require("./link/unlink"));

var _install = _interopRequireDefault(require("./install/install"));

var _uninstall = _interopRequireDefault(require("./install/uninstall"));

var _upgrade = _interopRequireDefault(require("./upgrade/upgrade"));

var _logAndroid = _interopRequireDefault(require("./logAndroid/logAndroid"));

var _logIOS = _interopRequireDefault(require("./logIOS/logIOS"));

var _dependencies = _interopRequireDefault(require("./dependencies/dependencies"));

var _info = _interopRequireDefault(require("./info/info"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * List of built-in commands
 */
const loadLocalCommands = [_server.default, _runIOS.default, _runAndroid.default, _library.default, _bundle.default, _ramBundle.default, _eject.default, _link.default, _unlink.default, _install.default, _uninstall.default, _upgrade.default, _logAndroid.default, _logIOS.default, _dependencies.default, _info.default];
/**
 * Returns an array of commands that are defined in the project.
 *
 * This checks all CLI plugins for presence of 3rd party packages that define commands
 * and loads them
 */

const loadProjectCommands = root => {
  const plugins = (0, _findPlugins.default)(root);
  return plugins.commands.reduce((acc, pathToCommands) => {
    /**
     * `pathToCommand` is a path to a file where commands are defined, relative to `node_modules`
     * folder.
     *
     * Following code gets the name of the package name out of the path, taking scope
     * into consideration.
     */
    const name = pathToCommands[0] === '@' ? pathToCommands.split(_path().default.sep).slice(0, 2).join(_path().default.sep) : pathToCommands.split(_path().default.sep)[0];

    const pkg = require(_path().default.join(root, 'node_modules', name, 'package.json'));

    const requiredCommands = require(_path().default.join(root, 'node_modules', pathToCommands));

    if (Array.isArray(requiredCommands)) {
      return acc.concat(requiredCommands.map(requiredCommand => _objectSpread({}, requiredCommand, {
        pkg
      })));
    }

    return acc.concat(_objectSpread({}, requiredCommands));
  }, []);
};
/**
 * Loads all the commands inside a given `root` folder
 */


function getCommands(root) {
  return [...loadLocalCommands, {
    name: 'init',
    func: () => {
      _logger.default.warn(['Looks like a React Native project already exists in the current', 'folder. Run this command from a different folder or remove node_modules/react-native'].join('\n'));
    }
  }, ...loadProjectCommands(root)];
}