import { chooseLanguage } from './helpers/chooseLanguage';
import { chooseSetupType } from './helpers/chooseSetupType';
import { resolveSpaceDirectory } from './helpers/resolveSpaceDirectory';

import { createProgram } from './services/createProgram';
import { createSpace } from './services/createSpace';

import { executeCommand } from './utils/ScriptsUtils/executeCommand';

export async function app() {
  const { program, spacePath } = createProgram();
  const { spaceName } = await resolveSpaceDirectory(spacePath);

  if (program.yes) createSpace(spaceName, [], 'default', 'js');

  const appSetupType = await chooseSetupType();
  const spaceLanguage = await chooseLanguage();

  switch (appSetupType) {
    case 'CRA':
      const cra = ['create-react-app', spaceName];
      cra.concat(spaceLanguage === 'ts' ? ['--template', 'typescript'] : []);
      executeCommand('npx', cra);
      break;

    case 'DEFAULT':
      createSpace(spaceName, [], 'default', spaceLanguage);
      break;

    case 'VITE':
      const args = ['create', 'vite@latest', spaceName, '--', '--template', spaceLanguage === 'ts' ? 'react-ts' : 'react'];

      executeCommand('npm', args);
      break;

    default:
      throw new Error('Incorrect option selected.');
  }
}
