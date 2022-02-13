export const FIXED_DEPENDENCIES = ['react', 'react-dom', 'react-scripts', 'web-vitals'];
export const FIXED_DEV_DEPENDENCIES = {
  js: ['@testing-library/jest-dom', '@testing-library/react', '@testing-library/user-event'],
  ts: [
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@testing-library/user-event',
    '@types/jest',
    '@types/node',
    '@types/react-dom',
    '@types/react',
    'typescript'
  ]
};

export const PACKAGE_KEYS_TO_MERGE = ['dependencies', 'scripts'];

export const PACKAGE_KEYS_TO_IGNORE = [
  'author',
  'bin',
  'browser',
  'bugs',
  'bundledDependencies',
  'contributors',
  'cpu',
  'description',
  'directories',
  'engineStrict',
  'files',
  'keywords',
  'license',
  'man',
  'name',
  'optionalDependencies',
  'os',
  'peerDependencies',
  'preferGlobal',
  'private',
  'publishConfig',
  'repository',
  'version'
];
