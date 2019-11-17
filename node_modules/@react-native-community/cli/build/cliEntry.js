"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;
Object.defineProperty(exports, "init", {
  enumerable: true,
  get: function () {
    return _init.default;
  }
});
Object.defineProperty(exports, "findPlugins", {
  enumerable: true,
  get: function () {
    return _findPlugins.default;
  }
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _child_process() {
  const data = _interopRequireDefault(require("child_process"));

  _child_process = function () {
    return data;
  };

  return data;
}

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
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

var _getLegacyConfig = _interopRequireDefault(require("./tools/getLegacyConfig"));

var _commands = require("./commands");

var _init = _interopRequireDefault(require("./commands/init/init"));

var _assertRequiredOptions = _interopRequireDefault(require("./tools/assertRequiredOptions"));

var _logger = _interopRequireDefault(require("./tools/logger"));

var _findPlugins = _interopRequireDefault(require("./tools/findPlugins"));

var _PackageManager = require("./tools/PackageManager");

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_commander().default.option('--version', 'Print CLI version').option('--projectRoot [string]', 'Path to the root of the project').option('--reactNativePath [string]', 'Path to React Native').option('--verbose', 'Increase logging verbosity');

_commander().default.on('command:*', () => {
  printUnknownCommand(_commander().default.args.join(' '));
  process.exit(1);
});

const defaultOptParser = val => val;

const handleError = err => {
  if (_commander().default.verbose) {
    _logger.default.error(err.message);
  } else {
    _logger.default.error(`${err.message}. ${_chalk().default.dim(`Run CLI with ${_chalk().default.reset('--verbose')} ${_chalk().default.dim('flag for more details.')}`)}`);
  }

  _logger.default.debug(err.stack);

  process.exit(1);
}; // Custom printHelpInformation command inspired by internal Commander.js
// one modified to suit our needs


function printHelpInformation(examples, pkg) {
  let cmdName = this._name;

  if (this._alias) {
    cmdName = `${cmdName}|${this._alias}`;
  }

  const sourceInformation = pkg ? [`${_chalk().default.bold('Source:')} ${pkg.name}@${pkg.version}`, ''] : [];
  let output = [_chalk().default.bold(`react-native ${cmdName} ${this.usage()}`), this._description ? `\n${this._description}\n` : '', ...sourceInformation, `${_chalk().default.bold('Options:')}`, this.optionHelp().replace(/^/gm, '  ')];

  if (examples && examples.length > 0) {
    const formattedUsage = examples.map(example => `  ${example.desc}: \n  ${_chalk().default.cyan(example.cmd)}`).join('\n\n');
    output = output.concat([_chalk().default.bold('\nExample usage:'), formattedUsage]);
  }

  return output.join('\n');
}

function printUnknownCommand(cmdName) {
  if (cmdName) {
    _logger.default.error(`Unrecognized command "${_chalk().default.bold(cmdName)}".`);

    _logger.default.info(`Run ${_chalk().default.bold('"react-native --help"')} to see a list of all available commands.`);
  } else {
    _commander().default.outputHelp();
  }
}

const addCommand = (command, ctx) => {
  const options = command.options || [];

  const cmd = _commander().default.command(command.name).description(command.description).action(function handleAction(...args) {
    const passedOptions = this.opts();
    const argv = Array.from(args).slice(0, -1);
    Promise.resolve().then(() => {
      (0, _assertRequiredOptions.default)(options, passedOptions);
      return command.func(argv, ctx, passedOptions);
    }).catch(handleError);
  });

  cmd.helpInformation = printHelpInformation.bind(cmd, command.examples, // $FlowFixMe - we know pkg may be missing...
  command.pkg);
  options.forEach(opt => cmd.option(opt.command, opt.description, opt.parse || defaultOptParser, opt.default));
  /**
   * We want every command (like "start", "link") to accept below options.
   * To achieve that we append them to regular options of each command here.
   * This way they'll be displayed in the commands --help menus.
   */

  cmd.option('--projectRoot [string]', 'Path to the root of the project').option('--reactNativePath [string]', 'Path to React Native');
};

async function run() {
  try {
    await setupAndRun();
  } catch (e) {
    handleError(e);
  }
}

async function setupAndRun() {
  // We only have a setup script for UNIX envs currently
  if (process.platform !== 'win32') {
    const scriptName = 'setup_env.sh';

    const absolutePath = _path().default.join(__dirname, '..', scriptName);

    try {
      _child_process().default.execFileSync(absolutePath, {
        stdio: 'pipe'
      });
    } catch (error) {
      _logger.default.warn(`Failed to run environment setup script "${scriptName}"\n\n${_chalk().default.red(error)}`);

      _logger.default.info(`React Native CLI will continue to run if your local environment matches what React Native expects. If it does fail, check out "${absolutePath}" and adjust your environment to match it.`);
    }
  }
  /**
   * At this point, commander arguments are not parsed yet because we need to
   * add all the commands and their options. That's why we resort to using
   * minimist for parsing some global options.
   */


  const options = (0, _minimist().default)(process.argv.slice(2));
  const root = options.projectRoot ? _path().default.resolve(options.projectRoot) : process.cwd();
  const reactNativePath = options.reactNativePath ? _path().default.resolve(options.reactNativePath) : (() => {
    try {
      return _path().default.dirname( // $FlowIssue: Wrong `require.resolve` type definition
      require.resolve('react-native/package.json', {
        paths: [root]
      }));
    } catch (_ignored) {
      throw new Error('Unable to find React Native files. Make sure "react-native" module is installed in your project dependencies.');
    }
  })();

  const ctx = _objectSpread({}, (0, _getLegacyConfig.default)(root), {
    reactNativePath,
    root
  });

  (0, _PackageManager.setProjectDir)(ctx.root);
  const commands = (0, _commands.getCommands)(ctx.root);
  commands.forEach(command => addCommand(command, ctx));

  _commander().default.parse(process.argv);

  if (_commander().default.rawArgs.length === 2) {
    _commander().default.outputHelp();
  } // We handle --version as a special case like this because both `commander`
  // and `yargs` append it to every command and we don't want to do that.
  // E.g. outside command `init` has --version flag and we want to preserve it.


  if (_commander().default.args.length === 0 && _commander().default.version === true) {
    console.log(_package.default.version);
  }

  _logger.default.setVerbose(_commander().default.verbose);
}

var _default = {
  run,
  init: _init.default,
  findPlugins: _findPlugins.default
};
exports.default = _default;