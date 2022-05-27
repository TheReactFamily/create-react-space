export type SpaceLanguage = 'js' | 'ts';

export type SpaceSetupType = 'CRA' | 'DEFAULT' | 'TEMPLATE' | 'VITE';

export type Templates = 'cra-template' | 'default' | ResolvedTemplates;

export type ResolvedTemplates = 'basic-error-boundary' | 'basic-recoil' | 'complete-recoil' | 'complete-styled-components';

export interface ConfigurationTemplate {
  package?: ConfigurationPackage;
}

type PackageEntry = { [name: string]: string };

export type PackageThings = 'dependencies' | 'devDependencies' | 'eslintConfig' | 'scripts';

export type ConfigurationPackage = {
  [key in PackageThings]?: PackageEntry;
};
