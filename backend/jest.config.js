/** @type {import('jest').Config} */
const config = {
    // Indicates the test environment (Node.js for backend testing)
    testEnvironment: 'node',
  
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
  
    // Optional: Specify directories Jest should ignore
    // modulePathIgnorePatterns: ['<rootDir>/some_directory_to_ignore/'],
  
    // Optional: Setup files to run before each test file (using __tests__ convention)
    // setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  
    // Optional: Enable coverage reporting
    // collectCoverage: true,
    // coverageDirectory: "coverage",
    // coverageProvider: "v8", // or "babel"
  };
  
  module.exports = config;