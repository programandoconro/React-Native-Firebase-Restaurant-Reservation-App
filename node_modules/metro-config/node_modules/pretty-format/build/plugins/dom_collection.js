'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.serialize = exports.test = undefined;

var _collections = require('../collections');

/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const SPACE = ' ';

const OBJECT_NAMES = ['DOMStringMap', 'NamedNodeMap'];
const ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;

const testName = name =>
  OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);

const test = (exports.test = val =>
  val &&
  val.constructor &&
  val.constructor.name &&
  testName(val.constructor.name));

// Convert array of attribute objects to props object.
const propsReducer = (props, attribute) => {
  props[attribute.name] = attribute.value;
  return props;
};

const serialize = (exports.serialize = (
  collection,
  config,
  indentation,
  depth,
  refs,
  printer
) => {
  const name = collection.constructor.name;
  if (++depth > config.maxDepth) {
    return '[' + name + ']';
  }

  return (
    (config.min ? '' : name + SPACE) +
    (OBJECT_NAMES.indexOf(name) !== -1
      ? '{' +
        (0, _collections.printObjectProperties)(
          name === 'NamedNodeMap'
            ? Array.prototype.reduce.call(collection, propsReducer, {})
            : Object.assign({}, collection),
          config,
          indentation,
          depth,
          refs,
          printer
        ) +
        '}'
      : '[' +
        (0, _collections.printListItems)(
          Array.from(collection),
          config,
          indentation,
          depth,
          refs,
          printer
        ) +
        ']')
  );
});

exports.default = {serialize: serialize, test: test};
