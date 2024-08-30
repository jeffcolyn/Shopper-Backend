export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    rootDir: 'src',
    testMatch: ['**/?(*.)+(spec|test).ts'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
  