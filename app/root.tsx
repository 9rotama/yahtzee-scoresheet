import { NuqsAdapter } from "nuqs/adapters/react-router/v8";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Header } from "./components/header";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { queryClient } from "./lib/query-client";
import { themeInitScript, themeStorageKey } from "./lib/theme";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// 静的 import だとビルド時に index.html を Node で描画する際、依存の react-grab が Node で JSON を import attribute なしで読み込みクラッシュするため、クライアントでのみ動的 import する
// コンポーネント内に import() を直接書かない: React Compiler が import() 式を未サポートで Layout ごと最適化をスキップするため
function startReactScan() {
  import("react-scan").then(({ scan }) => {
    scan({
      enabled: true,
    });
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Make sure to run react-scan only after hydration
    if (import.meta.env.DEV) {
      startReactScan();
    }
  }, []);

  return (
    // テーマ初期化スクリプトがハイドレーション前に <html> の class と style を書き換えるため、属性の不一致警告を抑える
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* CSS や JS の読み込みより前に置き、初回描画の時点でテーマが当たっているようにする */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: ビルド時に固定される自前のスクリプトで、外部入力を含まない
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        {/* App 側に置かない: 初回読み込み中は App の代わりに HydrateFallback が描画されるため、両方を包める Layout に置く */}
        <ThemeProvider
          attribute="class"
          storageKey={themeStorageKey}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// SPA モードでは HydrateFallback をルートにしか置けず、index.html にはこれが書き出される
// JS の読み込みと clientLoader の完了までの間に表示されるため、どのレイアウトにも共通するヘッダーの枠だけを出して画面が真っ白にならないようにする
export function HydrateFallback() {
  return <Header>{null}</Header>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "エラー";
  let details = "予期しないエラーが発生しました。";
  let stack: string | undefined;
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "エラー";
    details =
      error.status === 404
        ? "お探しのページが見つかりませんでした。"
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {/* 戻り先はシート状態で変わるため、固定ルートではなく "/" の振り分けに任せる */}
      {isNotFound && (
        <Button
          variant="secondary"
          className="w-full h-12 mt-8 font-bold rounded-full"
          asChild
        >
          <Link to="/">
            <ArrowLeft />
            ホームに戻る
          </Link>
        </Button>
      )}
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
