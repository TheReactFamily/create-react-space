import path, { basename, resolve } from 'path';

import { createDefaultApp } from './createDefaultApp';
import { resolveProjectDirectory } from './resolveProjectDirectory';

import { assertFolderEmpty } from '../helpers/assertFolderEmpty';
import { assertValidName } from '../helpers/assertValidName';
import { chooseLanguage } from '../helpers/chooseLanguage';
import { chooseSetupType } from '../helpers/chooseSetupType';

import type { IRun } from '../@types/Run';
import type { SpaceLanguage, SpaceSetupType } from '../@types/Space';

export const run = async ({ inputPath, program }: IRun) => {
  let appSetupType: SpaceSetupType;
  let projectRoot: string;
  let resolvedTemplate: string;
  let spaceLanguage: SpaceLanguage;

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
      spaceLanguage = await chooseLanguage();

      await createDefaultApp({ appName: basename(projectRoot), directory: projectRoot });
    } else {
      const templateDir = 'cra-template';
      path.dirname(require.resolve(`../templates/${templateDir}/package.json`));
    }
  }
};
