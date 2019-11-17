"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCommand = makeCommand;
exports.default = getHooks;

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
    return data;
  };

  return data;
}

var _getPackageConfiguration = _interopRequireDefault(require("./getPackageConfiguration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeCommand(command) {
  return cb => {
    if (!cb) {
      throw new Error(`You missed a callback function for the ${command} command`);
    }

    const args = command.split(' ');
    const cmd = args.shift();
    const commandProcess = (0, _child_process().spawn)(cmd, args, {
      stdio: 'inherit',
      stdin: 'inherit'
    });
    commandProcess.on('close', code => {
      if (code) {
        throw new Error(`Error occurred during executing "${command}" command`);
      }

      cb();
    });
  };
}

function getHooks(root) {
  const commands = (0, _getPackageConfiguration.default)(root).commands || {};
  const acc = {};
  Object.keys(commands).forEach(command => {
    acc[command] = makeCommand(commands[command]);
  });
  return acc;
}