import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "mqqgkk",
  viewportHeight: 800,
  viewportWidth: 1200,
  e2e: {
    baseUrl: "http://localhost:5173",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000, // 10 seconds
    requestTimeout: 10000, // 10 seconds
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "tests/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
