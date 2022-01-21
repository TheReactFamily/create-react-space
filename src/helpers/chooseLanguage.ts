import prompts from 'prompts';

import type { SpaceLanguage } from '../@types/Space';

type Choice = { title: string; value: SpaceLanguage };

export const chooseLanguage = async () => {
  const choices: Choice[] = [
    { title: 'Typescript', value: 'TYPESCRIPT' },
    { title: 'Javascript', value: 'JAVASCRIPT' }
  ];

  const { value } = await prompts({ choices, message: 'Which language would you like to use?', name: 'value', type: 'select' });

  return value as SpaceLanguage;
};
