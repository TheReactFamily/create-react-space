import prompts from 'prompts';

import { TEMPLATES_REPOSITORY } from '../configuration/constants/links';

import { terminalLink } from '../components/terminalLink';

export const chooseStartingPoint = async () => {
  const link = terminalLink({ text: 'spaces/templates', url: TEMPLATES_REPOSITORY });

  const choices = [
    { title: 'Default new app', value: 'default' },
    { title: `Template from ${link}`, value: 'example' }
  ];

  const { value } = await prompts({ choices, limit: 11, message: 'How would you like to start', name: 'value', type: 'select' });

  return value;
};
