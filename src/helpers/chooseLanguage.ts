import { promptSelect } from 'components/promptSelect';

import type { PromptSelectOption } from 'types/Prompt';
import type { SpaceLanguage } from 'types/ReactSpace';

export const chooseLanguage = async () => {
  const options: PromptSelectOption<SpaceLanguage>[] = [
    { title: 'react', value: 'js' },
    { title: 'react-ts', value: 'ts' }
  ];

  return await promptSelect({ message: 'Which language would you like to use?', options });
};
