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

export const createApp = async ({ appName, directory }: CreateDefaultAppProps) => {
  const packageJson = { name: appName, private: true, version: '1.0.0' };
  writeFileSync(join(resolve(appName), 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);

  process.chdir(resolve(appName));
  ensureDirSync(appName);

  console.log();
  console.log(`Creating a new React space in ${chalk.green(directory)}.`);
  console.log();

  try {
    const [packageToInstall, templateToInstall] = await Promise.all([getInstallPackage(), getTemplateInstallPackage()]);
    console.log('Installing packages. This might take a couple of minutes.');

    const allDependencies = ['react', 'react-dom', packageToInstall];

    const [packageInfo, templateInfo] = await Promise.all([getPackageInfo(packageToInstall), getPackageInfo(templateToInstall)]);
    console.log(`Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')}, and ${chalk.cyan(packageInfo.name)}...`);
    console.log();
    return install(allDependencies).then(() => ({ packageInfo, templateInfo }));
  } catch (error) {
    console.log('reason', error);
    process.exit(1);
  }
};
