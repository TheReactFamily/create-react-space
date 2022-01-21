import chalk from 'chalk';
import os from 'os';
import { ensureDirSync, writeFileSync } from 'fs-extra';
import path, { join, resolve } from 'path';

import { install } from './install';

import { getInstallPackage } from '../helpers/getInstallPackage';
import { getPackageInfo } from '../helpers/getPackageInfo';
import { getTemplateInstallPackage } from '../helpers/getTemplateInstallPackage';

import { isOnline } from '../utils/isOnline';
import { executeNodeScript } from '../helpers/executeNodeScript';

interface CreateDefaultAppProps {
  appName: string;
  directory: string;
}

export const createDefaultApp = ({ appName, directory }: CreateDefaultAppProps) => {
  const packageJson = { name: appName, private: true, version: '1.0.0' };
  writeFileSync(join(resolve(appName), 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);

  const root = resolve(appName);

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
        // const templateName = templateInfo.name;
        const templateName = 'cra-template-typescript';

        console.log('templateName', templateName);

        // setCaretRangeForRuntimeDeps(packageName);

        // const pnpPath = path.resolve(process.cwd(), '.pnp.js');
        const nodeArgs: string[] = [];
        console.log('packageName', packageName);

        // const init = require(`${packageName}/scripts/init.js`);
        // init.apply(`${path.resolve(appName)}`, JSON.parse(process.argv[1]), false, '', templateName);

        const response = await executeNodeScript(
          { cwd: process.cwd(), args: nodeArgs },
          [root, appName, templateName],
          // `
          //   const init = require('${packageName}/scripts/init.js');
          //   init.apply(${path.resolve(appName)}, JSON.parse(process.argv[1]));
          // `
          `
            const init = require('${packageName}/scripts/init.js');
            init.apply('${path.resolve(appName)}', JSON.parse(process.argv[1]), false, '', ${templateName});
          `
        );
        console.log('response', response);
      })
      .catch(reason => {
        console.log('reason', reason);
        process.exit(1);
      });
  });
};
