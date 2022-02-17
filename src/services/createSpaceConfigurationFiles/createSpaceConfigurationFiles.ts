import { ESLINT_CONFIGURATION, ESLINT_FILE_NAME, ESLINT_RULES_JS, ESLINT_RULES_TS } from '../../configuration/files/eslint';
import { JS_PATHS, PATHS, TS_PATHS } from '../../configuration/files/paths';
import { PRETTIER_CONFIGURATION, PRETTIER_FILE_NAME } from '../../configuration/files/prettier';
import { TS_CONFIG_FILE, TS_CONFIG_FILE_NAME } from '../../configuration/files/tsconfig';

import { createFile } from '../../utils/FilesUtils';

import type { SpaceLanguage } from '../../@types/Space';

export const createSpaceConfigurationFiles = (chosenLanguage: SpaceLanguage) => {
  const isTS = chosenLanguage === 'ts';

  createFile(PRETTIER_FILE_NAME, PRETTIER_CONFIGURATION);
  createFile(ESLINT_FILE_NAME, { ...ESLINT_CONFIGURATION, rules: isTS ? ESLINT_RULES_TS : { ...ESLINT_RULES_JS, ...ESLINT_RULES_TS } });

  if (isTS) {
    createFile(TS_CONFIG_FILE_NAME, TS_CONFIG_FILE);
    createFile(TS_PATHS, PATHS);
  } else {
    createFile(JS_PATHS, PATHS);
  }
};
