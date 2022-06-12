import prompts from 'prompts';

import type { PromptSelect } from 'types/Prompt';

export const promptSelect = async <T>({ limit, message, options }: PromptSelect<T>): Promise<T> => {
  const { value } = await prompts({ choices: options, limit, message, name: 'value', type: 'select' });

  return value as T;
};
