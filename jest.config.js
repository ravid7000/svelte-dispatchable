/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  transform: {
    "^.+\\.svelte$": "svelte-jester"
  },
  moduleFileExtensions: ["ts", "js", "svelte"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};