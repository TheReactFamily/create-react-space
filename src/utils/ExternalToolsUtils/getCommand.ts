import type { ExternalTool, SpaceLanguage } from '../../types/ReactSpace';

export const getCommand = (spaceName: string, language: SpaceLanguage, tool: ExternalTool): { command: string; args: string[] } => {
  switch (tool) {
    case 'create-react-app':
      return { command: 'npx', args: ['create-react-app', spaceName].concat(language === 'ts' ? ['--template', 'typescript'] : []) };

    case 'nextjs':
      return { command: 'npx', args: ['create-next-app@latest', spaceName].concat(language === 'ts' ? ['--typescript'] : []) };

    case 'remix':
      return {
        command: 'npx',
        args: ['create-remix', spaceName, '--template', 'remix-run/indie-stack'].concat(language === 'ts' ? ['--typescript'] : ['--no-typescript'])
      };

    case 'vite':
      return { command: 'npm', args: ['create', 'vite@latest', spaceName, '--', '--template', language === 'ts' ? 'react-ts' : 'react'] };

    default:
      throw new Error('Incorrect tool selected.');
  }
};
