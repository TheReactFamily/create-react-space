import { green } from 'chalk';

import { getDirectoryConflicts } from '../utils/getDirectoryConflicts';

export const assertFolderEmpty = (folderName: string, projectRoot: string) => {
  const conflicts = getDirectoryConflicts(projectRoot);

  if (conflicts.length) {
    console.log(`The directory ${green(folderName)} has files that might be overwritten:`);
    console.log();
    for (const file of conflicts) {
      console.log(`  ${file}`);
    }
    console.log();
    console.log('Consider using a new directory name, or moving these files.');
    console.log();
    process.exit(1);
  }
};
