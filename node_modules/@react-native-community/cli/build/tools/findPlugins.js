"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findPlugins;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _lodash() {
  const data = require("lodash");

  _lodash = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const RNPM_PLUGIN_PATTERNS = [/^rnpm-plugin-/, /^@(.*)\/rnpm-plugin-/];
const REACT_NATIVE_PLUGIN_PATTERNS = [/^react-native-/, /^@(.*)\/react-native-/, /^@react-native(.*)\/(?!rnpm-plugin-)/];
/**
 * Filter dependencies by name pattern
 * @param  {String} dependency Name of the dependency
 * @return {Boolean}           If dependency is a rnpm plugin
 */

const isRNPMPlugin = dependency => RNPM_PLUGIN_PATTERNS.some(pattern => pattern.test(dependency));

const isReactNativePlugin = dependency => REACT_NATIVE_PLUGIN_PATTERNS.some(pattern => pattern.test(dependency));

const readPackage = folder => {
  try {
    return require(_path().default.join(folder, 'package.json'));
  } catch (e) {
    return null;
  }
};

const findPluginsInReactNativePackage = pjson => {
  if (!pjson.rnpm || !pjson.rnpm.plugin) {
    return [];
  }

  return _path().default.join(pjson.name, pjson.rnpm.plugin);
};

const findPlatformsInPackage = pjson => {
  if (!pjson.rnpm || !pjson.rnpm.platform) {
    return [];
  }

  return _path().default.join(pjson.name, pjson.rnpm.platform);
};

const getEmptyPluginConfig = () => ({
  commands: [],
  platforms: [],
  haste: {
    platforms: [],
    providesModuleNodeModules: []
  }
});

const findHasteConfigInPackageAndConcat = (pjson, haste) => {
  if (!pjson.rnpm || !pjson.rnpm.haste) {
    return;
  }

  const pkgHaste = pjson.rnpm.haste;

  if (pkgHaste.platforms) {
    haste.platforms = haste.platforms.concat(pkgHaste.platforms);
  }

  if (pkgHaste.providesModuleNodeModules) {
    haste.providesModuleNodeModules = haste.providesModuleNodeModules.concat(pkgHaste.providesModuleNodeModules);
  }
};

const findPluginsInFolder = folder => {
  const pjson = readPackage(folder);

  if (!pjson) {
    return getEmptyPluginConfig();
  }

  const deps = (0, _lodash().union)(Object.keys(pjson.dependencies || {}), Object.keys(pjson.devDependencies || {}));
  return deps.reduce((acc, pkg) => {
    let {
      commands,
      platforms
    } = acc;

    if (isRNPMPlugin(pkg)) {
      commands = commands.concat(pkg);
    }

    if (isReactNativePlugin(pkg)) {
      const pkgJson = readPackage(_path().default.join(folder, 'node_modules', pkg));

      if (pkgJson) {
        commands = commands.concat(findPluginsInReactNativePackage(pkgJson));
        platforms = platforms.concat(findPlatformsInPackage(pkgJson));
        findHasteConfigInPackageAndConcat(pkgJson, acc.haste);
      }
    }

    return {
      commands,
      platforms,
      haste: acc.haste
    };
  }, getEmptyPluginConfig());
};
/**
 * Find plugins in package.json of the given folder
 * @param {String} folder Path to the folder to get the package.json from
 */


function findPlugins(folder) {
  const plugin = findPluginsInFolder(folder);
  return {
    commands: (0, _lodash().uniq)((0, _lodash().flatten)(plugin.commands)),
    platforms: (0, _lodash().uniq)((0, _lodash().flatten)(plugin.platforms)),
    haste: {
      platforms: (0, _lodash().uniq)((0, _lodash().flatten)(plugin.haste.platforms)),
      providesModuleNodeModules: (0, _lodash().uniq)((0, _lodash().flatten)(plugin.haste.providesModuleNodeModules))
    }
  };
}