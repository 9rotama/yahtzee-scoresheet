import { spawnSync } from "node:child_process";
import { mkdtempSync, unlinkSync, rmdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let directory;
beforeAll(() => {
  directory = mkdtempSync("app/layer-test-");
});
afterAll(() => {
  rmdirSync(directory);
});

function lint(source, extension) {
  const path = join(directory, `fixture.${extension}`);
  writeFileSync(path, source);
  try {
    return spawnSync(
      "node_modules/.bin/biome",
      ["lint", path, "--only=plugin"],
      { encoding: "utf8" },
    );
  } finally {
    unlinkSync(path);
  }
}

describe("Biome layer rules", () => {
  it.each([
    [
      'export const x = <div className="z-(--layer-header) md:z-(--layer-overlay)" style={{ zIndex: "var(--layer-header)" }} />;',
      "tsx",
    ],
    [
      ":root { --layer-header: 20; } header { z-index: var(--layer-header); @apply z-(--layer-header); }",
      "css",
    ],
    [
      "@media (min-width: 1px) { header { z-index: var(--layer-header); } }",
      "css",
    ],
    ['export const x = <div className="pizza-20" />;', "tsx"],
    [".header { @apply pizza-20 hover:z-(--layer-header); }", "css"],
  ])("accepts layer tokens", (source, extension) => {
    const result = lint(source, extension);
    expect(result.stderr).not.toContain("トークンを使用してください");
    expect(result.status).toBe(0);
  });

  it.each([
    ['export const x = <div className="z-20" />;', "tsx"],
    ['export const x = <div className="hover:-z-10" />;', "tsx"],
    ['export const x = <div className="!z-50" />;', "tsx"],
    ['export const x = <div className="z-(--other)" />;', "tsx"],
    ['export const x = <div className="z-[123]" />;', "tsx"],
    ['export const x = <div className="[z-index:123]" />;', "tsx"],
    ["export const x = <div style={{ zIndex: 20 }} />;", "tsx"],
    ['export const x = <div style={{ zIndex: "var(--other)" }} />;', "tsx"],
    ["export const x = `relative z-10`;", "tsx"],
    ['export const x = cn("relative", "z-10");', "tsx"],
    ["header { z-index: 20; }", "css"],
    ["header { z-index: var(--other); }", "css"],
    [".header { @apply z-20; }", "css"],
    [".header { @apply z-(--layer-header) z-20; }", "css"],
    [".header { @apply hover:z-10; }", "css"],
    [".header { @apply [z-index:123]; }", "css"],
  ])("rejects direct values", (source, extension) => {
    const result = lint(source, extension);
    expect(result.stderr).toContain("トークンを使用してください");
    expect(result.status).not.toBe(0);
  });
});
