module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/setupEnzyme.js',
  testPathIgnorePatterns: [
    '<rootDir>/test/setup/',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
};
