"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProjectDir = setProjectDir;
exports.install = install;
exports.installDev = installDev;
exports.uninstall = uninstall;

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
    return data;
  };

  return data;
}

var _yarn = require("./yarn");

let projectDir;

function executeCommand(command, options) {
  return (0, _child_process().execSync)(command, {
    stdio: options && options.silent ? 'pipe' : 'inherit'
  });
}

function shouldUseYarn(options) {
  if (options && options.preferYarn !== undefined) {
    return options.preferYarn && (0, _yarn.getYarnVersionIfAvailable)();
  }

  return (0, _yarn.isProjectUsingYarn)(projectDir) && (0, _yarn.getYarnVersionIfAvailable)();
}

function setProjectDir(dir) {
  projectDir = dir;
}

function install(packageNames, options) {
  return shouldUseYarn(options) ? executeCommand(`yarn add ${packageNames.join(' ')}`, options) : executeCommand(`npm install ${packageNames.join(' ')} --save --save-exact`, options);
}

function installDev(packageNames, options) {
  return shouldUseYarn(options) ? executeCommand(`yarn add -D ${packageNames.join(' ')}`, options) : executeCommand(`npm install ${packageNames.join(' ')} --save-dev --save-exact`, options);
}

function uninstall(packageNames, options) {
  return shouldUseYarn(options) ? executeCommand(`yarn remove ${packageNames.join(' ')}`, options) : executeCommand(`npm uninstall ${packageNames.join(' ')} --save`, options);
}