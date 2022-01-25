import prompts from 'prompts';

interface PromptSelectOption<T> {
  title: string;
  value: T;
}

interface PromptSelect<T> {
  limit?: number;
  message: string;
  options: PromptSelectOption<T>[];
}

export const promptSelect = async <T>({ limit, message, options }: PromptSelect<T>): Promise<T> => {
  const { value } = await prompts({ choices: options, limit, message, name: 'value', type: 'select' });

  return value as T;
};
