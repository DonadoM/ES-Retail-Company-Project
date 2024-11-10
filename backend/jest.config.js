// jest.config.js
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@models/(.*)$": "<rootDir>/src/models/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
};