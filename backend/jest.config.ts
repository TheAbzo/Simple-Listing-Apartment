export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 20000,
  setupFilesAfterEnv: ['./tests/setup.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
};
