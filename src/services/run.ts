import { basename, resolve } from 'path';
import { ensureDir } from 'fs-extra';

import { resolveProjectDirectory } from './resolveProjectDirectory';

import { assertFolderEmpty } from '../helpers/assertFolderEmpty';
import { assertValidName } from '../helpers/assertValidName';
import { chooseStartingPoint } from '../helpers/chooseStartingPoint';

import type { IRun } from '../@types/Run';

export const run = async ({ inputPath, program }: IRun) => {
  let projectRoot: string;

  if (!inputPath && program.yes) {
    projectRoot = resolve(process.cwd());

    const folderName = basename(projectRoot);
    assertValidName(folderName);
    assertFolderEmpty(folderName, projectRoot);
  } else {
    projectRoot = await resolveProjectDirectory(inputPath, program);
  }

  let resolvedTemplate = program.template;
  // let templatePath = program.templatePath;

  if (!program.yes && !resolvedTemplate) {
    resolvedTemplate = await chooseStartingPoint();
  }

  await ensureDir(projectRoot);
};
