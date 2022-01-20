import chalk from 'chalk';
import os from 'os';
import { ensureDirSync, writeFileSync } from 'fs-extra';
import { join, resolve } from 'path';

import { install } from './install';

import { getInstallPackage } from '../helpers/getInstallPackage';
import { getPackageInfo } from '../helpers/getPackageInfo';
import { getTemplateInstallPackage } from '../helpers/getTemplateInstallPackage';

import { isOnline } from '../utils/isOnline';

interface CreateDefaultAppProps {
  appName: string;
  directory: string;
  version: string;
}

export const createDefaultApp = ({ appName, directory, version }: CreateDefaultAppProps) => {
  const packageJson = { name: appName, private: true, version: '1.0.0' };
  writeFileSync(join(resolve(appName), 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);

  // const originalDirectory = process.cwd();
  process.chdir(resolve(appName));
  ensureDirSync(appName);

  console.log();
  console.log(`Creating a new React space in ${chalk.green(directory)}.`);
  console.log();

  Promise.all([getInstallPackage(), getTemplateInstallPackage()]).then(([packageToInstall, templateToInstall]) => {
    console.log();
    console.log('Installing packages. This might take a couple of minutes.');
    console.log();

    const allDependencies = ['react', 'react-dom', packageToInstall];

    Promise.all([getPackageInfo(packageToInstall), getPackageInfo(templateToInstall)])
      .then(([packageInfo, templateInfo]) => isOnline().then(isOnline => ({ isOnline, packageInfo, templateInfo })))
      .then(({ isOnline, packageInfo, templateInfo }) => {
        console.log(`Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')}, and ${chalk.cyan(packageInfo.name)}...`);
        console.log();
        return install(allDependencies).then(() => ({ packageInfo, templateInfo }));
      })
      .then(async ({ packageInfo, templateInfo }) => {
        const packageName = packageInfo.name;
        const templateName = undefined;

        // setCaretRangeForRuntimeDeps(packageName);

        // const pnpPath = path.resolve(process.cwd(), '.pnp.js');
        // const nodeArgs = fs.existsSync(pnpPath) ? ['--require', pnpPath] : [];

        // await executeNodeScript(
        //   { cwd: process.cwd(), args: nodeArgs },
        //   [root, appName, verbose, originalDirectory, templateName],
        //   `
        //   const init = require('${packageName}/scripts/init.js');
        //   init.apply(null, JSON.parse(process.argv[1]));
        //   `
        // );
      })
      .catch(reason => {
        console.log('reason', reason);
        process.exit(1);
      });
  });
};
