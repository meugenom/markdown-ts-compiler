module.exports = {
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ['ts', 'js','mjs'],
  moduleNameMapper: {
    '.html$': '<rootDir>/../jest/HtmlStub.js',
  },
  rootDir: './src/tests',
  modulePathIgnorePatterns: [
    "<rootDir>/../../.nvm", 
    "<rootDir>/../../.vscode-insiders",
    "Google Drive"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.nvm/"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex : "(/__tests__/.*|\\.(test|spec))\\.(ts|mjs)$",

};
