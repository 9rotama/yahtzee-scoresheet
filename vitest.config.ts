import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// reactRouter() は vitest 上では動かないため vite.config.ts とは分ける
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["fake-indexeddb/auto"],
  },
});
