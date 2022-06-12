export const adaptScriptForYarn = (scripts: { [key: string]: string }) => {
  return Object.entries(scripts).reduce((acc, [key, value]: [string, string]) => ({ ...acc, [key]: value.replace(/(npm run |npm )/, 'yarn ') }), {});
};
