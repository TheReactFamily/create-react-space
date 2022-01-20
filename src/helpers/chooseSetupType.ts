import prompts from 'prompts';

import { TEMPLATES_REPOSITORY } from '../configuration/constants/links';

import { terminalLink } from '../components/terminalLink';

import type { SpaceSetupType } from '../@types/Space';

type Choice = { title: string; value: SpaceSetupType };

export const chooseSetupType = async () => {
  const link = terminalLink({ text: 'spaces/templates', url: TEMPLATES_REPOSITORY });

  const choices: Choice[] = [
    { title: 'Default new app', value: 'DEFAULT' },
    { title: `Template from ${link}`, value: 'TEMPLATE' }
  ];

  const { value } = await prompts({ choices, limit: 11, message: 'How would you like to start', name: 'value', type: 'select' });

  return value as SpaceSetupType;
};
