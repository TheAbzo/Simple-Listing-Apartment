export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 20000,
  // setupFilesAfterEnv: ['./tests/setup.ts'],
   roots: ['<rootDir>/src/modules'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
