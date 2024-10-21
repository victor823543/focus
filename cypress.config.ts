import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "mqqgkk",
  e2e: {
    baseUrl: "http://localhost:5173",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000, // 10 seconds
    requestTimeout: 10000, // 10 seconds
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
