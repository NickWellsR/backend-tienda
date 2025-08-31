// jest.config.js
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  transform: {},
  testMatch: ['**/test/**/*.test.js']
};

export default config;