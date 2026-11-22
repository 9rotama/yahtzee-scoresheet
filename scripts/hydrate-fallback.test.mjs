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
    "export async function clientLoader() { return {}; }\nexport function HydrateFallback() { return null; }",
    "export const clientLoader = async () => ({});\nexport const HydrateFallback = () => null;",
    "export function HydrateFallback() { return null; }\nexport async function clientLoader() { return {}; }",
    "export async function loader() { return {}; }",
    "export default function Page() { return null; }",
  ])("accepts routes whose clientLoader has a HydrateFallback", (source) => {
    const result = lint(source);
    expect(result.stderr).not.toContain("HydrateFallback を定義してください");
    expect(result.status).toBe(0);
  });

  it.each([
    "export async function clientLoader() { return {}; }",
    "export function clientLoader() { return {}; }",
    "export const clientLoader = async () => ({});",
    "export async function clientLoader() { return {}; }\nfunction HydrateFallback() { return null; }",
  ])("rejects routes whose clientLoader has no HydrateFallback", (source) => {
    const result = lint(source);
    expect(result.stderr).toContain("HydrateFallback を定義してください");
    expect(result.status).not.toBe(0);
  });
});
