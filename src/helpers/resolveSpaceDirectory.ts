import { basename, resolve, dirname } from 'path';
import { mkdirpSync } from 'fs-extra';

import { assertFolderEmpty } from './assertFolderEmpty';
import { assertValidName } from './assertValidName';
import { chooseSpaceName } from './chooseSpaceName';

export const resolveSpaceDirectory = async (spacePath: string) => {
  let space = spacePath?.trim();

  if (!spacePath) space = await chooseSpaceName();

  const spaceAbsolutePath = resolve(space);
  const spaceDirectoryName = dirname(space);
  const spaceName = basename(space);

  assertValidName(spaceName);
  mkdirpSync(spaceAbsolutePath);
  assertFolderEmpty(spaceName, spaceAbsolutePath);

  return { spaceAbsolutePath, spaceDirectoryName, spaceName };
};
