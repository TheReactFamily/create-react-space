import { cyan, green } from 'chalk';
import { ensureDirSync, writeFileSync } from 'fs-extra';
import { EOL } from 'os';
import { join, resolve } from 'path';

import { FIXED_DEPENDENCIES } from '../../configuration/constants/dependencies';

import { executeNodeScript } from '../../helpers/executeNodeScript';

import { addTemplate } from '../addTemplate';
import { install } from '../install';

import type { Templates } from '../../@types/Space/Space.types';

export const createSpace = async (name: string, dependencies: string[], template: Templates) => {
  const packageJson = { name: name, private: true, version: '1.0.0' };
  const root = resolve(name);

  ensureDirSync(name);

  console.log();
  console.log(`Creating a new React space in ${green(name)}.`);
  console.log();

  writeFileSync(join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + EOL);
  process.chdir(root);

  try {
    console.log();
    console.log('Installing packages. This might take a couple of minutes.');
    console.log();
    console.log(`Installing: ${cyan('react')}, ${cyan('react-dom')}, and ${cyan('react-scripts')}...`);
    console.log();

    await install(FIXED_DEPENDENCIES.concat(dependencies));
    await executeNodeScript({ cwd: process.cwd(), args: [] }, [root, name, template], `'${addTemplate(root, name, '', root, template)}'`);
  } catch (error) {
    console.log('reason', error);
    process.exit(1);
  }

  return null;
};
