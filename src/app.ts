import { chooseExternalTool } from 'helpers/chooseExternalTool';
import { chooseLanguage } from 'helpers/chooseLanguage';
import { chooseSetUp } from 'helpers/chooseSetUp';
import { resolveSpaceDirectory } from 'helpers/resolveSpaceDirectory';

import { createProgram } from 'services/createProgram';
import { createSpace } from 'services/createSpace';

import { executeCommand } from 'utils/ScriptsUtils';
import { getCommand } from 'utils/ExternalToolsUtils';

import type { ExternalTool } from 'types/ReactSpace';

export async function app() {
  let spaceTool: ExternalTool = 'create-react-app';

  const { program, spacePath } = createProgram();
  const { spaceName } = await resolveSpaceDirectory(spacePath);

  if (program.yes) createSpace(spaceName, [], 'default', 'js');

  const spaceSetUp = await chooseSetUp();

  if (spaceSetUp === 'external-tool') spaceTool = await chooseExternalTool();

  const spaceLanguage = await chooseLanguage();

  switch (spaceSetUp) {
    case 'default':
      createSpace(spaceName, [], 'default', spaceLanguage);
      break;

    case 'external-tool':
      const { args, command } = getCommand(spaceName, spaceLanguage, spaceTool);

      executeCommand(command, args);
      break;

    default:
      throw new Error('Incorrect option selected.');
  }
}
