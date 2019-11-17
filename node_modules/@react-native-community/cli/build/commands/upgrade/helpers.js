"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = void 0;

function _https() {
  const data = _interopRequireDefault(require("https"));

  _https = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetch = url => new Promise((resolve, reject) => {
  const request = _https().default.get(url, response => {
    if (response.statusCode < 200 || response.statusCode > 299) {
      reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
    }

    const body = [];
    response.on('data', chunk => body.push(chunk));
    response.on('end', () => resolve(body.join('')));
  });

  request.on('error', err => reject(err));
});

exports.fetch = fetch;