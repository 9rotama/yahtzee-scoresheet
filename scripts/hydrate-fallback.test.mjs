import { spawnSync } from "node:child_process";
import { mkdtempSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let directory;
beforeAll(() => {
  directory = mkdtempSync("app/routes/hydrate-fallback-test-");
});
afterAll(() => {
  rmdirSync(directory);
});

function lint(source) {
  const path = join(directory, "fixture.tsx");
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

describe("Biome HydrateFallback rule", () => {
  it.each([
    "export async function clientLoader() { return {}; }",
    "export const clientLoader = async () => ({});",
    "export async function clientLoader() { return {}; }\nfunction HydrateFallback() { return null; }",
    "export default function Page() { return null; }",
  ])("accepts routes without a HydrateFallback export", (source) => {
    const result = lint(source);
    expect(result.stderr).not.toContain("HydrateFallback を app/root.tsx 以外");
    expect(result.status).toBe(0);
  });

  it.each([
    "export function HydrateFallback() { return null; }",
    "export const HydrateFallback = () => null;",
    "export async function clientLoader() { return {}; }\nexport function HydrateFallback() { return null; }",
  ])("rejects routes that export a HydrateFallback", (source) => {
    const result = lint(source);
    expect(result.stderr).toContain("HydrateFallback を app/root.tsx 以外");
    expect(result.status).not.toBe(0);
  });
});
