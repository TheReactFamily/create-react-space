import { promptSelect } from '../components/promptSelect';

import { TEMPLATES_REPOSITORY } from '../configuration/constants/links';

import { terminalLink } from '../components/terminalLink';

import type { SpaceSetupType } from '../@types/Space';

type Choice = { title: string; value: SpaceSetupType };

export const chooseSetupType = async () => {
  const link = terminalLink({ text: 'spaces/templates', url: TEMPLATES_REPOSITORY });

  const choices: Choice[] = [
    { title: 'Default, clean new space', value: 'DEFAULT' },
    { title: 'Classic create-react-app', value: 'CRA' },
    { title: `Template from ${link}`, value: 'TEMPLATE' }
  ];

  return await promptSelect({ limit: 15, message: 'How would you like to start', options: choices });
};
