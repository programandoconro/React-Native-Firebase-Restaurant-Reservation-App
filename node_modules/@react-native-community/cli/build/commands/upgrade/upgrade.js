"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

function _execa() {
  const data = _interopRequireDefault(require("execa"));

  _execa = function () {
    return data;
  };

  return data;
}

var _logger = _interopRequireDefault(require("../../tools/logger"));

var PackageManager = _interopRequireWildcard(require("../../tools/PackageManager"));

var _helpers = require("./helpers");

var _legacyUpgrade = _interopRequireDefault(require("./legacyUpgrade"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const webDiffUrl = 'https://react-native-community.github.io/upgrade-helper';
const rawDiffUrl = 'https://raw.githubusercontent.com/react-native-community/rn-diff-purge/diffs/diffs';

const getLatestRNVersion = async () => {
  _logger.default.info('No version passed. Fetching latest...');

  const {
    stdout
  } = await (0, _execa().default)('npm', ['info', 'react-native', 'version']);
  return stdout;
};

const getRNPeerDeps = async version => {
  const {
    stdout
  } = await (0, _execa().default)('npm', ['info', `react-native@${version}`, 'peerDependencies', '--json']);
  return JSON.parse(stdout);
};

const getPatch = async (currentVersion, newVersion, projectDir) => {
  let patch;
  const rnDiffAppName = 'RnDiffApp';

  const {
    name
  } = require(_path().default.join(projectDir, 'package.json'));

  _logger.default.info(`Fetching diff between v${currentVersion} and v${newVersion}...`);

  try {
    patch = await (0, _helpers.fetch)(`${rawDiffUrl}/${currentVersion}..${newVersion}.diff`);
  } catch (error) {
    _logger.default.error(`Failed to fetch diff for react-native@${newVersion}. Maybe it's not released yet?`);

    _logger.default.info('For available releases to diff see: https://github.com/react-native-community/rn-diff-purge#version-changes');

    return null;
  }

  return patch.replace(new RegExp(rnDiffAppName, 'g'), name).replace(new RegExp(rnDiffAppName.toLowerCase(), 'g'), name.toLowerCase());
};

const getVersionToUpgradeTo = async (argv, currentVersion, projectDir) => {
  const newVersion = argv[0] ? _semver().default.valid(argv[0]) || (_semver().default.coerce(argv[0]) ? _semver().default.coerce(argv[0]).version : null) : await getLatestRNVersion();

  if (!newVersion) {
    _logger.default.error(`Provided version "${argv[0]}" is not allowed. Please pass a valid semver version`);

    return null;
  }

  if (_semver().default.gt(currentVersion, newVersion)) {
    _logger.default.error(`Trying to upgrade from newer version "${currentVersion}" to older "${newVersion}"`);

    return null;
  }

  if (_semver().default.eq(currentVersion, newVersion)) {
    const {
      dependencies: {
        'react-native': version
      }
    } = require(_path().default.join(projectDir, 'package.json'));

    if (_semver().default.satisfies(newVersion, version)) {
      _logger.default.warn(`Specified version "${newVersion}" is already installed in node_modules and it satisfies "${version}" semver range. No need to upgrade`);

      return null;
    }

    _logger.default.error(`Dependency mismatch. Specified version "${newVersion}" is already installed in node_modules and it doesn't satisfy "${version}" semver range of your "react-native" dependency. Please re-install your dependencies`);

    return null;
  }

  return newVersion;
};

const installDeps = async (newVersion, projectDir) => {
  _logger.default.info(`Installing "react-native@${newVersion}" and its peer dependencies...`);

  const peerDeps = await getRNPeerDeps(newVersion);
  const deps = [`react-native@${newVersion}`, ...Object.keys(peerDeps).map(module => `${module}@${peerDeps[module]}`)];
  PackageManager.install(deps, {
    silent: true
  });
  await (0, _execa().default)('git', ['add', 'package.json']);

  try {
    await (0, _execa().default)('git', ['add', 'yarn.lock']);
  } catch (error) {// ignore
  }

  try {
    await (0, _execa().default)('git', ['add', 'package-lock.json']);
  } catch (error) {// ignore
  }
};

const applyPatch = async (currentVersion, newVersion, tmpPatchFile) => {
  const defaultExcludes = ['package.json'];
  let filesThatDontExist = [];
  let filesThatFailedToApply = []; // $FlowFixMe ThenableChildProcess is incompatible with Promise

  const {
    stdout: relativePathFromRoot
  } = await (0, _execa().default)('git', ['rev-parse', '--show-prefix']);

  try {
    try {
      const excludes = defaultExcludes.map(e => `--exclude=${_path().default.join(relativePathFromRoot, e)}`);
      await (0, _execa().default)('git', ['apply', // According to git documentation, `--binary` flag is turned on by
      // default. However it's necessary when running `git apply --check` to
      // actually accept binary files, maybe a bug in git?
      '--binary', '--check', tmpPatchFile, ...excludes, '-p2', '--3way', `--directory=${relativePathFromRoot}`]);

      _logger.default.info('Applying diff...');
    } catch (error) {
      const errorLines = error.stderr.split('\n');
      filesThatDontExist = [...errorLines.filter(x => x.includes('does not exist in index')).map(x => x.replace(/^error: (.*): does not exist in index$/, '$1'))].filter(Boolean);
      filesThatFailedToApply = errorLines.filter(x => x.includes('patch does not apply')).map(x => x.replace(/^error: (.*): patch does not apply$/, '$1')).filter(Boolean);

      _logger.default.info('Applying diff...');

      _logger.default.warn(`Excluding files that exist in the template, but not in your project:\n${filesThatDontExist.map(file => `  - ${_chalk().default.bold(file)}`).join('\n')}`);

      if (filesThatFailedToApply.length) {
        _logger.default.error(`Excluding files that failed to apply the diff:\n${filesThatFailedToApply.map(file => `  - ${_chalk().default.bold(file)}`).join('\n')}\nPlease make sure to check the actual changes after the upgrade command is finished.\nYou can find them in our Upgrade Helper web app: ${_chalk().default.underline.dim(`${webDiffUrl}/?from=${currentVersion}&to=${newVersion}`)}`);
      }
    } finally {
      const excludes = [...defaultExcludes, ...filesThatDontExist, ...filesThatFailedToApply].map(e => `--exclude=${_path().default.join(relativePathFromRoot, e)}`);
      await (0, _execa().default)('git', ['apply', tmpPatchFile, ...excludes, '-p2', '--3way', `--directory=${relativePathFromRoot}`]);
    }
  } catch (error) {
    if (error.stderr) {
      _logger.default.debug(`"git apply" failed. Error output:\n${error.stderr}`);
    }

    _logger.default.error('Automatically applying diff failed. We did our best to automatically upgrade as many files as possible');

    return false;
  }

  return true;
};
/**
 * Upgrade application to a new version of React Native.
 */


async function upgrade(argv, ctx, args) {
  if (args.legacy) {
    return _legacyUpgrade.default.func(argv, ctx);
  }

  const tmpPatchFile = 'tmp-upgrade-rn.patch';
  const projectDir = ctx.root;

  const {
    version: currentVersion
  } = require(_path().default.join(projectDir, 'node_modules/react-native/package.json'));

  const newVersion = await getVersionToUpgradeTo(argv, currentVersion, projectDir);

  if (!newVersion) {
    return;
  }

  const patch = await getPatch(currentVersion, newVersion, projectDir);

  if (patch === null) {
    return;
  }

  if (patch === '') {
    _logger.default.info('Diff has no changes to apply, proceeding further');

    await installDeps(newVersion, projectDir);

    _logger.default.success(`Upgraded React Native to v${newVersion} 🎉. Now you can review and commit the changes`);

    return;
  }

  let patchSuccess;

  try {
    _fs().default.writeFileSync(tmpPatchFile, patch);

    patchSuccess = await applyPatch(currentVersion, newVersion, tmpPatchFile);
  } catch (error) {
    throw new Error(error.stderr || error);
  } finally {
    try {
      _fs().default.unlinkSync(tmpPatchFile);
    } catch (e) {// ignore
    }

    const {
      stdout
    } = await (0, _execa().default)('git', ['status', '-s']);

    if (!patchSuccess) {
      if (stdout) {
        _logger.default.warn('Continuing after failure. Some of the files are upgraded but you will need to deal with conflicts manually');

        await installDeps(newVersion, projectDir);

        _logger.default.info('Running "git status" to check what changed...');

        await (0, _execa().default)('git', ['status'], {
          stdio: 'inherit'
        });
      } else {
        _logger.default.error('Patch failed to apply for unknown reason. Please fall back to manual way of upgrading');
      }
    } else {
      await installDeps(newVersion, projectDir);

      _logger.default.info('Running "git status" to check what changed...');

      await (0, _execa().default)('git', ['status'], {
        stdio: 'inherit'
      });
    }

    if (!patchSuccess) {
      if (stdout) {
        _logger.default.warn('Please run "git diff" to review the conflicts and resolve them');
      }

      _logger.default.info(`You may find these resources helpful:
• Release notes: ${_chalk().default.underline.dim(`https://github.com/facebook/react-native/releases/tag/v${newVersion}`)}
• Manual Upgrade Helper: ${_chalk().default.underline.dim(`${webDiffUrl}/?from=${currentVersion}&to=${newVersion}`)}
• Git diff: ${_chalk().default.underline.dim(`${rawDiffUrl}/${currentVersion}..${newVersion}.diff`)}`);

      throw new Error('Upgrade failed. Please see the messages above for details');
    }
  }

  _logger.default.success(`Upgraded React Native to v${newVersion} 🎉. Now you can review and commit the changes`);
}

const upgradeCommand = {
  name: 'upgrade [version]',
  description: "Upgrade your app's template files to the specified or latest npm version using `rn-diff-purge` project. Only valid semver versions are allowed.",
  func: upgrade,
  options: [{
    command: '--legacy',
    description: "Legacy implementation. Upgrade your app's template files to the latest version; run this after " + 'updating the react-native version in your package.json and running npm install'
  }]
};
var _default = upgradeCommand;
exports.default = _default;