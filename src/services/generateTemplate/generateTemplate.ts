import { appendFileSync, copySync, existsSync, moveSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'fs-extra';
import { green } from 'chalk';
import { dirname, join } from 'path';
import { EOL } from 'os';
import spawn from 'cross-spawn';

import { PACKAGE_KEYS_TO_IGNORE, PACKAGE_KEYS_TO_MERGE } from 'configuration/constants/dependencies/dependencies.constant';
import { SUPPORTED_BROWSERS } from 'configuration/constants/compatibility/compatibility.config';

import { createSpaceConfigurationFiles } from 'services/createSpaceConfigurationFiles';
import { showSuccessMessages } from 'services/showSuccessMessages';

import { adaptScriptForYarn } from 'utils/ScriptsUtils';
import { tryGitCommit, tryGitInit } from 'utils/GitUtils';

import type { MoveOptions } from 'fs-extra';
import type { PackageJSON, PackageParameter } from 'types/Package';
import type { SpaceLanguage, TemplateConfiguration, Templates } from 'types/ReactSpace';

const DEFAULT_REACT_SCRIPTS = {
  start: 'react-scripts start',
  build: 'react-scripts build',
  test: 'react-scripts test',
  eject: 'react-scripts eject'
};

export const generateTemplate = async (spaceName: string, spacePath: string, template: Templates, chosenLanguage: SpaceLanguage) => {
  const appPackage = require(join(spacePath, 'package.json'));
  const isUsingYarn = existsSync(join(spacePath, 'yarn.lock'));

  const templatePath = dirname(require.resolve(`../../../templates/${template}/package.json`));
  const templateJSONPath = join(templatePath, chosenLanguage === 'js' ? 'template.json' : 'template-ts.json');

  const templateJson: TemplateConfiguration = existsSync(templateJSONPath) ? require(templateJSONPath) : {};
  const templatePackage = templateJson.package || {};

  const templateScripts = templatePackage.scripts || {};

  appPackage.dependencies = appPackage.dependencies || {};
  appPackage.devDependencies = appPackage.devDependencies || {};
  appPackage.scripts = Object.assign(DEFAULT_REACT_SCRIPTS, templateScripts);

  if (isUsingYarn) {
    appPackage.scripts = adaptScriptForYarn(appPackage.scripts);
  }

  appPackage.eslintConfig = { extends: 'react-app' };
  appPackage.browserslist = SUPPORTED_BROWSERS;

  const toReplace = templatePackageToReplace(templatePackage);
  toReplace.forEach(key => (appPackage[key] = templatePackage[key]));

  writeFileSync(join(spacePath, 'package.json'), JSON.stringify(appPackage, null, 2) + EOL);

  const hasReadme = existsSync(join(spacePath, 'README.md'));

  if (hasReadme) {
    renameSync(join(spacePath, 'README.md'), join(spacePath, 'README.old.md'));
  }

  // COPY FILES
  const templateDirectory = join(templatePath, chosenLanguage);

  if (existsSync(templateDirectory)) {
    copySync(templateDirectory, spacePath);
  } else {
    console.error(`Could not locate supplied template: ${green(templateDirectory)}`);
    return;
  }

  // CREATE PRETTIER AND ESLINT
  createSpaceConfigurationFiles(chosenLanguage);

  // modifies README.md commands based on user used package manager.
  if (isUsingYarn) {
    try {
      const readme = readFileSync(join(spacePath, 'README.md'), 'utf8');
      writeFileSync(join(spacePath, 'README.md'), readme.replace(/(npm run |npm )/g, 'yarn '), 'utf8');
    } catch (error) {}
  }

  const hasGitignore = existsSync(join(spacePath, '.gitignore'));
  if (hasGitignore) {
    // Append if there's already a `.gitignore` file there
    const data = readFileSync(join(spacePath, 'gitignore'));
    appendFileSync(join(spacePath, '.gitignore'), data);
    unlinkSync(join(spacePath, 'gitignore'));
  } else {
    // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
    // See: https://github.com/npm/npm/issues/1862
    moveSync(join(spacePath, 'gitignore'), join(spacePath, '.gitignore'), [] as MoveOptions);
  }

  // INITIALIZE GIT REPO
  let isGitRepositoryInitialized = false;

  if (tryGitInit()) {
    isGitRepositoryInitialized = true;
    console.log();
    console.log('Initialized a git repository.');
  }

  let args = isUsingYarn ? ['add'] : ['install', '--no-audit', '--save'].filter(e => e);

  const command = isUsingYarn ? 'yarnpkg' : 'npm';
  const remove = isUsingYarn ? 'remove' : 'uninstall';

  // Install additional template dependencies, if present.
  const dependenciesToInstall = Object.entries({ ...templatePackage.dependencies, ...templatePackage.devDependencies });

  if (dependenciesToInstall.length) {
    args = args.concat(dependenciesToInstall.map(([dependency, version]) => `${dependency}@${version}`));
  }

  // TODO: verify TYPESCRIPT
  // if (args.find(arg => arg.includes('typescript'))) {
  // verifyTypeScriptSetup();
  // }

  // Remove template
  console.log(`Removing template package using ${command}...`);
  console.log();

  const proc = spawn.sync(command, [remove, template], { stdio: 'inherit' });

  if (proc.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`);
    return;
  }

  // Create git commit if git repo was initialized
  if (isGitRepositoryInitialized && tryGitCommit(spacePath)) {
    console.log();
    console.log('Created git commit.');
  }

  showSuccessMessages(spaceName, spacePath, hasReadme, isUsingYarn);
};

const templatePackageToReplace = (pack: PackageJSON) => {
  return Object.keys(pack).filter(key => !PACKAGE_KEYS_TO_IGNORE.includes(key) && !PACKAGE_KEYS_TO_MERGE.includes(key)) as PackageParameter[];
};
