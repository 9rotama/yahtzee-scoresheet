import type { Config } from "@react-router/dev/config";

export default {
  // データはすべて IndexedDB にあり、サーバで描画できる内容がないため SPA として配信する
  // ビルド時にルートの Layout だけを build/client/index.html へ書き出し、どのパスにもこの HTML を返す
  ssr: false,
} satisfies Config;
