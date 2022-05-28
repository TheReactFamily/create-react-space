import { red } from 'chalk';

import { validateName } from 'utils/validateName';

export const assertValidName = (folderName: string) => {
  const validation = validateName(folderName);

  if (typeof validation === 'string') {
    console.log(`Cannot create an app named ${red(`"${folderName}"`)}. ${validation}`);
    process.exit(1);
  }
};
