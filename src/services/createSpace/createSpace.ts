import { ensureDirSync, writeFileSync } from 'fs-extra';
import { EOL } from 'os';
import { green } from 'chalk';
import { join, resolve } from 'path';

import { FIXED_DEPENDENCIES } from 'configuration/constants/dependencies';
import { FIXED_DEV_DEPENDENCIES } from 'configuration/constants/dependencies/dependencies.constant';

import { executeNodeScript } from 'helpers/executeNodeScript';

import { generateTemplate } from 'services/generateTemplate';
import { install } from 'services/install';

import type { SpaceLanguage, Templates } from 'types/ReactSpace';

export const createSpace = async (name: string, dependencies: string[], template: Templates, chosenLanguage: SpaceLanguage, root: string) => {
  const packageJson = { name, version: '0.0.0' };

  ensureDirSync(root);

  console.log();
  console.log(`Creating a new React space in ${green(root)}.`);
  console.log();

  writeFileSync(join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + EOL);
  process.chdir(root);

  try {
    await install(FIXED_DEPENDENCIES.concat(dependencies));
    await install(FIXED_DEV_DEPENDENCIES[chosenLanguage].concat(dependencies), 'dev');
    await executeNodeScript({ cwd: process.cwd(), args: [] }, [root, name, template], `'${generateTemplate(name, root, template, chosenLanguage)}'`);
  } catch (error) {
    console.log('reason', error);
    process.exit(1);
  }
};
