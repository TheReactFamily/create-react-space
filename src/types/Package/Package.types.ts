export type PackageEntry = { [name: string]: string };

export type PackageParameter = 'dependencies' | 'devDependencies' | 'eslintConfig' | 'scripts';

export type PackageJSON = {
  [key in PackageParameter]?: PackageEntry;
};
