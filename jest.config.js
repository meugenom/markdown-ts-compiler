module.exports = {
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'mjs'],
  moduleNameMapper: {
    '\\.html$': '<rootDir>/jest/HtmlStub.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/tests/styleMock.js',
    '^raw-loader!.*$': '<rootDir>/src/tests/stringMock.js',    
    '^shiki/core$': '<rootDir>/src/tests/shikiMock.js',
    '^@shikijs/engine-oniguruma$': '<rootDir>/src/tests/onigurumaMock.js',
    '^@shikijs/(.*)$': '<rootDir>/src/tests/styleMock.js',
  },
  rootDir: '.',
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|mjs)$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
  ],
  roots: [
    "<rootDir>/src",
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts",
    "!src/**/index.ts"
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["html", "text", "lcov"],
};