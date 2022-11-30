module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.css$": ["jest-transform-css", { modules: true }],
  },
};
