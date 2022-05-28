import type { PackageJSON } from 'types/Package/Package.types';

export type ExternalTool = 'create-react-app' | 'nextjs' | 'remix' | 'vite';

export type Templates = 'default' | 'with-styled-components' | 'with-recoil' | 'with-error-boundary';

export type TemplateConfiguration = { package?: PackageJSON };

export type SpaceLanguage = 'js' | 'ts';

export type SpaceTemplate = ExternalTool | Templates;

export type SpaceSetUpType = 'default' | 'external-tool' | 'template';
