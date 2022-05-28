import { basename, resolve } from 'path';
import prompts from 'prompts';

import { validateName } from 'utils/validateName';

export const chooseSpaceName = async () => {
  let name = '';

  const { answer } = await prompts({
    initial: 'my-react-space',
    message: 'How would like to name your space?',
    name: 'answer',
    type: 'text',
    validate: name => {
      const validation = validateName(basename(resolve(name)));

      if (typeof validation === 'string') return `Invalid project name: ${validation}`;

      return true;
    }
  });

  if (typeof answer === 'string') {
    name = answer.trim();
  }

  return name;
};
