import { reactRouter } from "@react-router/dev/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    // @vitejs/plugin-react の reactCompilerPreset は使わない: React Router の Vite プラグインが React Refresh を自前で扱うため plugin-react は入れておらず、プリセットのためだけに追加すると Refresh の変換が二重になる
    // react.dev の React Router 向け手順にある vite-plugin-babel は使わない: Vite 8 (Rolldown) 向けの @rolldown/plugin-babel が enforce: "pre" で TSX のまま変換でき、@babel/preset-typescript も不要なため
    babel({
      plugins: ["babel-plugin-react-compiler"],
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
