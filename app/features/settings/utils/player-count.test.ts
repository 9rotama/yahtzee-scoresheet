import { describe, expect, it } from "vitest";
import { MAX_PLAYERS } from "../models";
import { canAddPlayer, canStartGame } from "./player-count";

describe("canAddPlayer", () => {
  it("上限未満ならプレイヤーを追加できる", () => {
    expect(canAddPlayer(0)).toBe(true);
    expect(canAddPlayer(MAX_PLAYERS - 1)).toBe(true);
  });

  it("上限に達していたらプレイヤーを追加できない", () => {
    expect(canAddPlayer(MAX_PLAYERS)).toBe(false);
  });
});

describe("canStartGame", () => {
  it("プレイヤーが 0 人ならゲームを開始できない", () => {
    expect(canStartGame(0)).toBe(false);
  });

  it("1 人から上限人数までならゲームを開始できる", () => {
    expect(canStartGame(1)).toBe(true);
    expect(canStartGame(MAX_PLAYERS)).toBe(true);
  });

  it("上限を超えた人数ではゲームを開始できない", () => {
    expect(canStartGame(MAX_PLAYERS + 1)).toBe(false);
  });
});
