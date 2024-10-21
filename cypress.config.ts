import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:80",
    chromeWebSecurity: false,
    defaultCommandTimeout: 30000, // 30 seconds
    requestTimeout: 30000, // 30 seconds
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
