export const validateName = (name: string): string | boolean => {
  if (typeof name !== 'string' || name === '') return 'The project name cannot be empty.';

  if (!/^[a-z0-9@.\-_]+$/i.test(name)) return 'The project name can only contain URL-friendly characters.';

  return true;
};
