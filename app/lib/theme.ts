// ThemeProvider（next-themes）とテーマ初期化スクリプトで同じ値を使うため、ここにまとめる
export const themeStorageKey = "theme";

// next-themes の ThemeProvider もインラインスクリプトを出すが、ThemeProvider は <body> の中にしか置けない
// <body> の途中にあるスクリプトは、そこまでの HTML で初回描画が走るとその後に実行され、ダークモードでも一瞬ライトで描かれる
// 確実に初回描画より前に実行するため、同じ処理を <head> に置く（next-themes のスクリプトも後で同じ結果を当てるだけなので二重でも問題ない）
export const themeInitScript = `(() => {
  let theme;
  try {
    theme = localStorage.getItem(${JSON.stringify(themeStorageKey)});
  } catch {}
  if (theme !== "light" && theme !== "dark") {
    theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
})();`;
