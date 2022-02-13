import { readdirSync } from 'fs-extra';

import { SUPPORTED_FILES } from '../../configuration/constants/compatibility';

export const getDirectoryConflicts = (directory: string): string[] => {
  return readdirSync(directory).filter((file: string) => !(/\.iml$/.test(file) || SUPPORTED_FILES.includes(file)));
};
