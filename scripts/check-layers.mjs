import { readdir, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { parseSync } from "@babel/core";

const tokenValue = /^var\(\s*--layer-[\w-]+\s*\)$/;
const layerClass =
  /(?:^|[\s"'`])(?:[\w[\]():./%-]+:)*(!?-?z-(?:\[[^\]]+\]|\([^)]*\)|[^\s"'`]+))/g;
const tokenClass = /^z-\(--layer-[\w-]+\)$/;

export function checkLayers(source, file) {
  const errors = [];
  const report = (message) => errors.push(`${file}: ${message}`);
  const checkClasses = (value) => {
    for (const match of value.matchAll(layerClass)) {
      if (!tokenClass.test(match[1]))
        report(`直接指定されたクラス ${match[1]}`);
    }
    if (/(?:^|\s)(?:[^\s]+:)?\[z-index\s*:/i.test(value))
      report("直接指定された z-index クラス");
  };

  if (file.endsWith(".css")) {
    const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
    for (const match of css.matchAll(/@apply\s+([^;}]*)/g)) {
      checkClasses(match[1]);
    }
    for (const match of css.matchAll(/\bz-index\s*:\s*([^;}]*)/gi)) {
      if (!tokenValue.test(match[1].trim()))
        report(`直接指定された z-index: ${match[1].trim()}`);
    }
  } else {
    const tree = parseSync(source, {
      filename: file,
      babelrc: false,
      configFile: false,
      parserOpts: { plugins: ["typescript", "jsx"] },
    });
    const visit = (node) => {
      if (!node || typeof node !== "object") return;
      if (node.type === "StringLiteral") {
        checkClasses(node.value);
      }
      if (node.type === "TemplateElement") checkClasses(node.value.raw);
      if (
        node.type === "ObjectProperty" &&
        !node.computed &&
        ["zIndex", "z-index"].includes(node.key.name ?? node.key.value)
      ) {
        if (
          node.value.type !== "StringLiteral" ||
          !tokenValue.test(node.value.value)
        )
          report("直接指定された zIndex");
      }
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object") visit(value);
      }
    };
    visit(tree);
  }
  return errors;
}

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const path = `${directory}/${entry.name}`;
        return entry.isDirectory()
          ? filesIn(path)
          : /\.(?:css|[jt]sx?)$/.test(path)
            ? [path]
            : [];
      }),
    )
  ).flat();
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const files = await filesIn("app");
  const errors = (
    await Promise.all(
      files.map(async (file) =>
        checkLayers(await readFile(file, "utf8"), file),
      ),
    )
  ).flat();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  }
}
