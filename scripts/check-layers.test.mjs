import { describe, expect, it } from "vitest";
import { checkLayers } from "./check-layers.mjs";

describe("layer tokens", () => {
  it("accepts named tokens in classes, CSS, and inline styles", () => {
    expect(
      checkLayers(
        'const x = <div className="z-(--layer-header) md:z-(--layer-overlay)" style={{ zIndex: "var(--layer-header)" }} />',
        "app/test.tsx",
      ),
    ).toEqual([]);
    expect(
      checkLayers(
        ":root { --layer-header: 20; } header { z-index: var(--layer-header); }",
        "app/test.css",
      ),
    ).toEqual([]);
  });

  it.each([
    '<div className="z-20" />',
    '<div className="hover:-z-10" />',
    '<div className="!z-50" />',
    '<div className="z-(--other)" />',
    '<div className="z-[123]" />',
    '<div className="[z-index:123]" />',
    "<div style={{ zIndex: 20 }} />",
    '<div style={{ zIndex: "var(--other)" }} />',
  ])("rejects direct JSX values: %s", (source) => {
    expect(checkLayers(source, "app/test.tsx").length).toBeGreaterThan(0);
  });

  it.each(["header { z-index: 20; }", ".header { @apply z-20; }"])(
    "rejects direct CSS values: %s",
    (source) => {
      expect(checkLayers(source, "app/test.css").length).toBeGreaterThan(0);
    },
  );
});
