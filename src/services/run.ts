import { basename, resolve } from 'path';
import { ensureDir } from 'fs-extra';

import { createDefaultApp } from './createDefaultApp';
import { resolveProjectDirectory } from './resolveProjectDirectory';

import { assertFolderEmpty } from '../helpers/assertFolderEmpty';
import { assertValidName } from '../helpers/assertValidName';
import { chooseSetupType } from '../helpers/chooseSetupType';

import type { IRun } from '../@types/Run';
import type { SpaceSetupType } from '../@types/Space';

export const run = async ({ inputPath, program }: IRun) => {
  let appSetupType: SpaceSetupType;
  let projectRoot: string;
  let resolvedTemplate: string;

  if (!inputPath && program.yes) {
    projectRoot = resolve(process.cwd());

    const folderName = basename(projectRoot);
    assertValidName(folderName);
    assertFolderEmpty(folderName, projectRoot);
  } else {
    projectRoot = await resolveProjectDirectory(inputPath, program);
  }

  if (!program.yes) {
    appSetupType = await chooseSetupType();

    if (appSetupType === 'DEFAULT') {
      console.log('projectRoot', projectRoot);
      console.log('folderName', basename(projectRoot));
      await createDefaultApp({ appName: basename(projectRoot), directory: projectRoot, version: '1.0.0' });
    }
  }

  await ensureDir(projectRoot);
};
