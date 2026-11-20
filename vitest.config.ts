import { defineConfig } from "vitest/config";

// reactRouter() は vitest 上では動かないため vite.config.ts とは分ける
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    setupFiles: ["fake-indexeddb/auto"],
  },
});
