import chalk from 'chalk';
import fs, { MoveOptions } from 'fs-extra';
import os from 'os';
import path from 'path';
import spawn from 'cross-spawn';

import { isReactInstalled } from '../helpers/isReactInstalled';
import { tryGitCommit, tryGitInit } from '../utils/GitUtils';

const defaultBrowsers = {
  production: ['>0.2%', 'not dead', 'not op_mini all'],
  development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
};

export function addTemplate(appPath: string, appName: string, verbose: string, originalDirectory: string, templateName: string) {
  const appPackage = require(path.join(appPath, 'package.json'));
  const useYarn = fs.existsSync(path.join(appPath, 'yarn.lock'));

  if (!templateName) {
    console.log('');
    console.error(`A template was not provided. This is likely because you're using an outdated version of ${chalk.cyan('create-react-app')}.`);
    console.error(`Please note that global installs of ${chalk.cyan('create-react-app')} are no longer supported.`);
    console.error(
      `You can fix this by running ${chalk.cyan('npm uninstall -g create-react-app')} or ${chalk.cyan(
        'yarn global remove create-react-app'
      )} before using ${chalk.cyan('create-react-app')} again.`
    );
    return;
  }

  //   const templatePath = path.dirname(require.resolve(`${templateName}/package.json`, { paths: [appPath] }));
  const templatePath = path.dirname(require.resolve(`../templates/${templateName}/package.json`));

  const templateJsonPath = path.join(templatePath, 'template.json');

  let templateJson: any = {};
  if (fs.existsSync(templateJsonPath)) {
    templateJson = require(templateJsonPath);
  }

  const templatePackage = templateJson.package || {};

  // This was deprecated in CRA v5.
  if (templateJson.dependencies || templateJson.scripts) {
    console.log();
    console.log(
      chalk.red(
        'Root-level `dependencies` and `scripts` keys in `template.json` were deprecated for Create React App 5.\n' +
          'This template needs to be updated to use the new `package` key.'
      )
    );
    console.log('For more information, visit https://cra.link/templates');
  }

  // Keys to ignore in templatePackage
  const templatePackageBlacklist = [
    'name',
    'version',
    'description',
    'keywords',
    'bugs',
    'license',
    'author',
    'contributors',
    'files',
    'browser',
    'bin',
    'man',
    'directories',
    'repository',
    'peerDependencies',
    'bundledDependencies',
    'optionalDependencies',
    'engineStrict',
    'os',
    'cpu',
    'preferGlobal',
    'private',
    'publishConfig'
  ];

  // Keys from templatePackage that will be merged with appPackage
  const templatePackageToMerge = ['dependencies', 'scripts'];

  // Keys from templatePackage that will be added to appPackage,
  // replacing any existing entries.
  const templatePackageToReplace = Object.keys(templatePackage).filter(key => {
    return !templatePackageBlacklist.includes(key) && !templatePackageToMerge.includes(key);
  });

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};

  // Setup the script rules
  const templateScripts = templatePackage.scripts || {};
  appPackage.scripts = Object.assign(
    {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test',
      eject: 'react-scripts eject'
    },
    templateScripts
  );

  // Update scripts for Yarn users
  if (useYarn) {
    appPackage.scripts = Object.entries(appPackage.scripts).reduce(
      (acc, [key, value]: [any, any]) => ({
        ...acc,
        [key]: value.replace(/(npm run |npm )/, 'yarn ')
      }),
      {}
    );
  }

  // Setup the eslint config
  appPackage.eslintConfig = {
    extends: 'react-app'
  };

  // Setup the browsers list
  appPackage.browserslist = defaultBrowsers;

  // Add templatePackage keys/values to appPackage, replacing existing entries
  templatePackageToReplace.forEach(key => {
    appPackage[key] = templatePackage[key];
  });

  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2) + os.EOL);

  const readmeExists = fs.existsSync(path.join(appPath, 'README.md'));
  if (readmeExists) {
    fs.renameSync(path.join(appPath, 'README.md'), path.join(appPath, 'README.old.md'));
  }

  // Copy the files for the user
  const templateDir = path.join(templatePath, 'template');
  if (fs.existsSync(templateDir)) {
    fs.copySync(templateDir, appPath);
  } else {
    console.error(`Could not locate supplied template: ${chalk.green(templateDir)}`);
    return;
  }

  // modifies README.md commands based on user used package manager.
  if (useYarn) {
    try {
      const readme = fs.readFileSync(path.join(appPath, 'README.md'), 'utf8');
      fs.writeFileSync(path.join(appPath, 'README.md'), readme.replace(/(npm run |npm )/g, 'yarn '), 'utf8');
    } catch (err) {
      // Silencing the error. As it fall backs to using default npm commands.
    }
  }

  const gitignoreExists = fs.existsSync(path.join(appPath, '.gitignore'));
  if (gitignoreExists) {
    // Append if there's already a `.gitignore` file there
    const data = fs.readFileSync(path.join(appPath, 'gitignore'));
    fs.appendFileSync(path.join(appPath, '.gitignore'), data);
    fs.unlinkSync(path.join(appPath, 'gitignore'));
  } else {
    // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
    // See: https://github.com/npm/npm/issues/1862
    fs.moveSync(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'), [] as MoveOptions);
  }

  // Initialize git repo
  let initializedGit = false;

  if (tryGitInit()) {
    initializedGit = true;
    console.log();
    console.log('Initialized a git repository.');
  }

  let command;
  let remove;
  let args;

  if (useYarn) {
    command = 'yarnpkg';
    remove = 'remove';
    args = ['add'];
  } else {
    command = 'npm';
    remove = 'uninstall';
    args = [
      'install',
      '--no-audit', // https://github.com/facebook/create-react-app/issues/11174
      '--save',
      verbose && '--verbose'
    ].filter(e => e);
  }

  // Install additional template dependencies, if present.
  const dependenciesToInstall = Object.entries({
    ...templatePackage.dependencies,
    ...templatePackage.devDependencies
  });
  if (dependenciesToInstall.length) {
    args = args.concat(
      dependenciesToInstall.map(([dependency, version]) => {
        return `${dependency}@${version}`;
      })
    );
  }

  // Install react and react-dom for backward compatibility with old CRA cli
  // which doesn't install react and react-dom along with react-scripts
  if (!isReactInstalled(appPackage)) {
    args = args.concat(['react', 'react-dom']);
  }

  // Install template dependencies, and react and react-dom if missing.
  if ((!isReactInstalled(appPackage) || templateName) && args.length > 1) {
    console.log();
    console.log(`Installing template dependencies using ${command}...`);

    const proc = spawn.sync(command, args, { stdio: 'inherit' });
    if (proc.status !== 0) {
      console.error(`\`${command} ${args.join(' ')}\` failed`);
      return;
    }
  }

  if (args.find(arg => arg.includes('typescript'))) {
    console.log('ups, typescript is not supported, please, check it in 5 days');
    // verifyTypeScriptSetup();
  }

  // Remove template
  console.log(`Removing template package using ${command}...`);
  console.log();

  const proc = spawn.sync(command, [remove, templateName], {
    stdio: 'inherit'
  });
  if (proc.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`);
    return;
  }

  // Create git commit if git repo was initialized
  if (initializedGit && tryGitCommit(appPath)) {
    console.log();
    console.log('Created git commit.');
  }

  // Display the most elegant way to cd.
  // This needs to handle an undefined originalDirectory for
  // backward compatibility with old global-cli's.
  let cdpath;
  if (originalDirectory && path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  // Change displayed command to yarn instead of yarnpkg
  const displayedCommand = useYarn ? 'yarn' : 'npm';

  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} start`));
  console.log('    Starts the development server.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`));
  console.log('    Bundles the app into static files for production.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} test`));
  console.log('    Starts the test runner.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`));
  console.log('    Removes this tool and copies build dependencies, configuration files');
  console.log('    and scripts into the app directory. If you do this, you can’t go back!');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`);
  if (readmeExists) {
    console.log();
    console.log(chalk.yellow('You had a `README.md` file, we renamed it to `README.old.md`'));
  }
  console.log();
  console.log('Happy hacking!');
}
