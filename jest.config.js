// You can learn more about each option below in the Jest docs: https://jestjs.io/docs/configuration.
process.env.TZ = 'GMT';

module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>[/\\\\](node_modules|.next)[/\\\\]',
    '<rootDir>/.jest/test-utils.tsx',
    '<rootDir>/__mocks__/*'
  ],
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  watchPlugins: ['jest-watch-typeahead/filename'],
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  coverageReporters: ['json', 'html'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.*',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/src/components/**/*.stories.*',
    '!<rootDir>/src/pages/_app.tsx'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    'next/image': '<rootDir>/__mocks__/ImageMock.tsx',
    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/lib(.*)$': '<rootDir>/src/lib$1',
    '^@/config(.*)$': '<rootDir>/src/config$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/mocks(.*)$': '<rootDir>/__mocks__$1',
    '^@/tests(.*)$': '<rootDir>/.jest$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/state/(.*)$': '<rootDir>/src/components/state/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
