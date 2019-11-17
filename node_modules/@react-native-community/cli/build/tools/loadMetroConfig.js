"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = load;
exports.getDefaultConfig = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _metro() {
  const data = require("metro");

  _metro = function () {
    return data;
  };

  return data;
}

function _metroConfig() {
  const data = require("metro-config");

  _metroConfig = function () {
    return data;
  };

  return data;
}

var _findPlugins = _interopRequireDefault(require("./findPlugins"));

var _findSymlinkedModules = _interopRequireDefault(require("./findSymlinkedModules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const resolveSymlinksForRoots = roots => roots.reduce((arr, rootPath) => arr.concat((0, _findSymlinkedModules.default)(rootPath, roots)), [...roots]);

const getWatchFolders = () => {
  const root = process.env.REACT_NATIVE_APP_ROOT;

  if (root) {
    return resolveSymlinksForRoots([_path().default.resolve(root)]);
  }

  return [];
};

const getBlacklistRE = () => (0, _metro().createBlacklist)([/.*\/__fixtures__\/.*/]);
/**
 * Default configuration
 *
 * @todo(grabbou): As a separate PR, haste.platforms should be added before "native".
 * Otherwise, a.native.js will not load on Windows or other platforms
 */


const getDefaultConfig = ctx => {
  const plugins = (0, _findPlugins.default)(ctx.root);
  return {
    resolver: {
      resolverMainFields: ['react-native', 'browser', 'main'],
      blacklistRE: getBlacklistRE(),
      platforms: ['ios', 'android', 'native', ...plugins.haste.platforms],
      providesModuleNodeModules: ['react-native', ...plugins.haste.providesModuleNodeModules],
      hasteImplModulePath: _path().default.join(ctx.reactNativePath, 'jest/hasteImpl')
    },
    serializer: {
      getModulesRunBeforeMainModule: () => [require.resolve(_path().default.join(ctx.reactNativePath, 'Libraries/Core/InitializeCore'))],
      getPolyfills: () => require(_path().default.join(ctx.reactNativePath, 'rn-get-polyfills'))()
    },
    server: {
      port: process.env.RCT_METRO_PORT || 8081
    },
    transformer: {
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
      assetRegistryPath: _path().default.join(ctx.reactNativePath, 'Libraries/Image/AssetRegistry')
    },
    watchFolders: getWatchFolders()
  };
};

exports.getDefaultConfig = getDefaultConfig;

/**
 * Loads Metro Config and applies `options` on top of the resolved config.
 *
 * This allows the CLI to always overwrite the file settings.
 */
function load(ctx, options) {
  const defaultConfig = getDefaultConfig(ctx);

  if (options && options.reporter) {
    /**
     * $FlowIssue: Metro doesn't accept `reporter` to be passed along other options
     * and will ignore the value, if provided.
     *
     * We explicitly read `reporter` value and set it on a default configuration. Note
     * that all other options described in the `ConfigOptionsT` are handled by Metro
     * automatically.
     *
     * This is a temporary workaround.
     */
    defaultConfig.reporter = options.reporter;
  }

  return (0, _metroConfig().loadConfig)(_objectSpread({
    cwd: ctx.root
  }, options), defaultConfig);
}