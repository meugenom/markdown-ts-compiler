module.exports = {
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ['ts', 'js','mjs'],
  moduleNameMapper: {
    '.html$': '<rootDir>/../jest/HtmlStub.js',
  },
  rootDir: './src/tests',
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex : "(/__tests__/.*|\\.(test|spec))\\.(ts|mjs)$",

};
