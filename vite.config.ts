import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certs/server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/server.cert")),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
});
