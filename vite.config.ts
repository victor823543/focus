import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const isTesting = process.env.VITE_TESTING === "true"; // Check if in testing mode

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      ...(isProduction || isTesting
        ? { open: true } // Open browser on server start in production
        : {
            https: {
              key: fs.readFileSync(path.resolve(__dirname, "certs/server.key")),
              cert: fs.readFileSync(
                path.resolve(__dirname, "certs/server.cert"),
              ),
            },
          }),
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "tests/setupTests",
      mockReset: true,
    },
  };
});
