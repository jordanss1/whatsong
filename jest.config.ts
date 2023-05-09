module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [
    "src/setupTests.js",
    "@testing-library/react/cleanup-after-each",
    "@testing-library/jest-dom/extend-expect",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
