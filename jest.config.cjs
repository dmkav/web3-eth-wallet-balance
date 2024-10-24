module.exports = {
  preset: 'jest-preset-preact',
  setupFilesAfterEnv: ['<rootDir>/_tests_/setup.ts'],
  moduleNameMapper: {
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
  },
}
