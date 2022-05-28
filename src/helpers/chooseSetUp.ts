import { promptSelect } from '../components/promptSelect';

import type { PromptSelectOption } from '../types/Prompt';
import type { SpaceSetUpType } from '../types/ReactSpace';

export const chooseSetUp = async () => {
  // const link = terminalLink({ text: 'TheReactFamily/templates', url: TEMPLATES_REPOSITORY });

  const options: PromptSelectOption<SpaceSetUpType>[] = [
    { title: 'Default, clean new space', value: 'default' },
    { title: 'External tool', value: 'external-tool' }
    // { title: `Template from ${link}`, value: 'template' }
  ];

  return await promptSelect({ limit: 15, message: 'How would you like to start your space?', options });
};
