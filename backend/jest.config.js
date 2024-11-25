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
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  reporters: [
    [
      "jest-junit", // Reporter JUnit
      {
        outputDirectory: "coverage", // Carpeta de salida para el reporte
        outputName: "junit-report.xml", // Nombre del archivo de reporte
      },
    ],
  ],
};
