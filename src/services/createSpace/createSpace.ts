import { cyan, green } from 'chalk';
import { ensureDirSync, writeFileSync } from 'fs-extra';
import { EOL } from 'os';
import { join, resolve } from 'path';

import { FIXED_DEPENDENCIES } from '../../configuration/constants/dependencies';
import { FIXED_DEV_DEPENDENCIES } from '../../configuration/constants/dependencies/dependencies.constant';

import { executeNodeScript } from '../../helpers/executeNodeScript';

import { generateTemplate } from '../generateTemplate';
import { install } from '../install';

import type { SpaceLanguage, Templates } from '../../@types/Space/Space.types';

export const createSpace = async (name: string, dependencies: string[], template: Templates, chosenLanguage: SpaceLanguage) => {
  const packageJson = { name: name, private: true, version: '1.0.0' };
  const root = resolve(name);

  ensureDirSync(name);

  console.log();
  console.log(`Creating a new React space in ${green(name)}.`);
  console.log();

  writeFileSync(join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + EOL);
  process.chdir(root);

  try {
    await Promise.all([
      install(FIXED_DEPENDENCIES.concat(dependencies)),
      install(FIXED_DEV_DEPENDENCIES[chosenLanguage].concat(dependencies), 'dev')
    ]);
    await executeNodeScript({ cwd: process.cwd(), args: [] }, [root, name, template], `'${generateTemplate(name, root, template, chosenLanguage)}'`);
  } catch (error) {
    console.log('reason', error);
    process.exit(1);
  }
};
