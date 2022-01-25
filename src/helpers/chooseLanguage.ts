import { promptSelect } from '../components/promptSelect';

import type { SpaceLanguage } from '../@types/Space';

type Choice = { title: string; value: SpaceLanguage };

export const chooseLanguage = async () => {
  const choices: Choice[] = [
    { title: 'Typescript', value: 'TYPESCRIPT' },
    { title: 'Javascript', value: 'JAVASCRIPT' }
  ];

  return await promptSelect({ message: 'Which language would you like to use?', options: choices });
};
