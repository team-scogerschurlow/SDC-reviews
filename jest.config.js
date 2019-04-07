module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    collectCoverageFrom: ['client/src/**/*.{js,jsx,mjs}'],
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['js', 'json', 'jsx'],
    setupFiles: ['<rootDir>/enzyme.config.js'],
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    testURL: 'http://localhost',
    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    // Indicates whether each individual test should be reported during the run
    transform: {
        "^.+\\.jsx$": "babel-jest",
        "^.+\\.js$": "babel-jest"
        },
    verbose: false,
  };