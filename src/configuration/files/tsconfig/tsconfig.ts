export const TS_CONFIG_FILE_NAME = 'tsconfig.json';

export const TS_CONFIG_FILE = {
  compilerOptions: {
    allowJs: true,
    allowSyntheticDefaultImports: true,
    baseUrl: './src',
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    isolatedModules: true,
    jsx: 'react-jsx',
    lib: ['dom', 'dom.iterable', 'esnext'],
    module: 'esnext',
    moduleResolution: 'node',
    noEmit: true,
    noFallthroughCasesInSwitch: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    strict: true,
    target: 'ES6'
  },
  include: ['src'],
  extends: './paths.json'
};
