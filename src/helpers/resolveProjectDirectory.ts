import { basename, resolve } from 'path';
import { ensureDir } from 'fs-extra';
import { green, magenta } from 'chalk';

import { assertFolderEmpty } from './assertFolderEmpty';
import { assertValidName } from './assertValidName';
import { chooseSpaceName } from './chooseSpaceName';

import type { IProgram } from '../@types/Program';

export const resolveProjectDirectory = async (input: string, program: IProgram) => {
  let name = input?.trim();

  if (!name) {
    const chosenName = await chooseSpaceName();
    name = chosenName;
  }

  if (!name) {
    console.log('');
    console.log('Please choose your app name:');
    console.log(`  ${green(program.name())} ${magenta('<app-name>')}`);
    console.log('');
    console.log(`Run ${green(`${program.name()} --help`)} for more info.`);
    process.exit(1);
  }

  const projectRoot = resolve(name);
  const folderName = basename(projectRoot);

  assertValidName(folderName);
  await ensureDir(projectRoot);
  assertFolderEmpty(folderName, projectRoot);

  return name;
};
