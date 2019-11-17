"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessError = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProcessError extends Error {
  constructor(msg, processError) {
    super(`${_chalk().default.red(msg)}\n\n${_chalk().default.gray(processError)}`);
    Error.captureStackTrace(this, ProcessError);
  }

}

exports.ProcessError = ProcessError;