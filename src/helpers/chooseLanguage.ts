import { promptSelect } from '../components/promptSelect';

import type { SpaceLanguage } from '../@types/Space';

type Choice = { title: string; value: SpaceLanguage };

export const chooseLanguage = async () => {
  const choices: Choice[] = [
    { title: 'Typescript', value: 'ts' },
    { title: 'Javascript', value: 'js' }
  ];

  return await promptSelect({ message: 'Which language would you like to use?', options: choices });
};
