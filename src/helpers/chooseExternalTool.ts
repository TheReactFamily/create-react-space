import { promptSelect } from '../components/promptSelect';

import { getCommand } from '../utils/ExternalToolsUtils/getCommand';

import type { PromptSelectOption } from '../types/Prompt';
import type { ExternalTool } from '../types/ReactSpace';

export const chooseExternalTool = async () => {
  const options: PromptSelectOption<ExternalTool>[] = [
    { title: 'CRA', value: 'create-react-app' },
    { title: 'NextJS', value: 'nextjs' },
    { title: 'Remix', value: 'remix' },
    { title: 'Vite', value: 'vite' }
  ];

  return await promptSelect({ message: 'Choose your tool', options });
  //   const { args, command } = getCommand(spaceName, language, selectedTool);

  //   return { args, command, selectedTool };
};
