import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server";

// Start the MSW server before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset any request handlers that are declared as a part of the test setup.
afterEach(() => server.resetHandlers());

// Clean up once the tests are done.
afterAll(() => server.close());
