module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Handles .ts/.tsx files with ts-jest
    },
    moduleNameMapper: {
      "^@models/(.*)$": "<rootDir>/src/models/$1",
      "^@rules/(.*)$": "<rootDir>/src/rules/$1",
      "^@data/(.*)$": "<rootDir>/data/$1",
    },
  };
  