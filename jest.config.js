module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 55,
      lines: 65,
      statements: 65,
    },
  },
};
