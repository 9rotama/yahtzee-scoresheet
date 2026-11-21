import { ast, defineRule, registerDiagnostic } from "@biomejs/runtime/plugin";

const layerClass =
  /(?:^|[\s"'`])(?:[\w[\]():./%-]+:)*(!?-?z-(?:\[[^\]]+\]|\([^)]*\)|[^\s"'`]+))/g;
const tokenClass = /^z-\(--layer-[\w-]+\)$/;
const tokenValue = /^var\(\s*--layer-[\w-]+\s*\)$/;

export const layerClasses = defineRule({
  query: ast(
    "JSX_STRING",
    "JS_STRING_LITERAL_EXPRESSION",
    "JS_TEMPLATE_CHUNK_ELEMENT",
  ),
  run(node) {
    const text = node.text;
    const invalid =
      [...text.matchAll(layerClass)].some(
        (match) => !tokenClass.test(match[1]),
      ) || /(?:^|[\s"'`])(?:[^\s]+:)?\[z-index\s*:/i.test(text);
    if (invalid)
      registerDiagnostic(
        node,
        "error",
        "重なり順には --layer-* トークンを使用してください。",
      );
  },
});

export const layerStyles = defineRule({
  query: ast("JS_PROPERTY_OBJECT_MEMBER"),
  run(node) {
    const name = node.name?.text?.trim().replace(/^['"]|['"]$/g, "");
    if (name !== "zIndex" && name !== "z-index") return;
    const value = node.value?.text?.trim();
    const literal =
      node.value?.kind === "JS_STRING_LITERAL_EXPRESSION" &&
      value?.slice(1, -1);
    if (!literal || !tokenValue.test(literal))
      registerDiagnostic(
        node,
        "error",
        "重なり順には --layer-* トークンを使用してください。",
      );
  },
});
