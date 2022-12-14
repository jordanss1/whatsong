import { server } from "./mocks/server.js";
import { cleanup } from "@testing-library/react";

// Establish API mocking before all tests.

beforeAll(() => {
  server.listen();
  server.resetHandlers();
});

// Reset any request handlers that we may add during the tests,

// so they don't affect other tests.

afterEach(() => {
  window.sessionStorage.clear();
  server.resetHandlers();
  cleanup();
});

// Clean up after the tests are finished.

afterAll(() => {
  server.close();
  cleanup();
});
