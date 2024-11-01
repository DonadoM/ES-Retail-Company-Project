// jest.config.js
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@models/(.*)$": "<rootDir>/src/models/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
