import { IDBFactory } from "fake-indexeddb";
import { openDB } from "idb";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CurrentSheet } from "~/models/sheet";

const defaultSheet: CurrentSheet = {
  players: [],
  rule: { name: "yahtzee" },
  scores: [],
};

// db.client.ts は import 時に DB を開くため、テストごとに空の DB とモジュールを用意し直す
async function loadFreshDb() {
  globalThis.indexedDB = new IDBFactory();
  vi.resetModules();
  return await import("./db.client");
}

describe("currentSheet", () => {
  let db: Awaited<ReturnType<typeof loadFreshDb>>;

  beforeEach(async () => {
    db = await loadFreshDb();
  });

  it("DB が未作成の初回利用時でも初期値のシートを返す", async () => {
    await expect(db.getCurrentSheet()).resolves.toEqual(defaultSheet);
  });

  it("DB はあるが currentSheet のレコードが無いときは初期値で復旧する", async () => {
    await db.getCurrentSheet();
    const raw = await openDB("yams-sheet", 1);
    await raw.delete("currentSheet", "single");
    raw.close();

    await expect(db.getCurrentSheet()).resolves.toEqual(defaultSheet);
  });

  it("初回利用時に更新したシートを読み出せる", async () => {
    const sheet: CurrentSheet = {
      ...defaultSheet,
      rule: { name: "yams" },
    };

    await db.updateCurrentSheet(sheet);

    await expect(db.getCurrentSheet()).resolves.toEqual(sheet);
  });

  it("initCurrentSheet は保存済みのシートを初期値に戻す", async () => {
    await db.updateCurrentSheet({ ...defaultSheet, rule: { name: "yams" } });

    await db.initCurrentSheet();

    await expect(db.getCurrentSheet()).resolves.toEqual(defaultSheet);
  });
});
