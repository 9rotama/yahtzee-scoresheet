import { describe, expect, it } from "vitest";
import { resolveCurrentPlayerIdx } from "./current-player";

const players = [
  { id: "a", name: "A" },
  { id: "b", name: "B" },
  { id: "c", name: "C" },
];

describe("resolveCurrentPlayerIdx", () => {
  it("存在する ID ならそのプレイヤーの位置を返す", () => {
    expect(resolveCurrentPlayerIdx(players, "b")).toBe(1);
  });

  it("存在しない ID なら先頭プレイヤーの位置を返す", () => {
    expect(resolveCurrentPlayerIdx(players, "unknown")).toBe(0);
  });
});
