module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  rootDir: '.',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleNameMapper: {
    'components/(.*)': '<rootDir>/src//components/$1',
    'configuration/(.*)': '<rootDir>/src//configuration/$1',
    'helpers/(.*)': '<rootDir>/src//helpers/$1',
    'services/(.*)': '<rootDir>/src//services/$1',
    'types/(.*)': '<rootDir>/src//types/$1',
    'utils/(.*)': '<rootDir>/src//utils/$1'
  }
};
