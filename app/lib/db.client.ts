import { openDB, type DBSchema } from "idb";
import { nanoid } from "nanoid";
import type { CurrentSheet, PreviousSheet } from "~/models/sheet";

interface DB extends DBSchema {
  currentSheet: {
    key: "single";
    value: CurrentSheet;
  };
  previousSheets: {
    key: string;
    value: PreviousSheet;
  };
}

const defaultCurrentSheet = (): CurrentSheet => ({
  players: [],
  rule: { name: "yahtzee" },
  scores: [],
});

// upgrade 内で `await db` すると upgrade 完了後の別トランザクションになり、
// 直後の読み取りと競合するため、versionchange トランザクション上で初期値を入れる
const db = openDB<DB>("yams-sheet", 1, {
  upgrade(db, _oldVersion, _newVersion, transaction) {
    db.createObjectStore("currentSheet");
    db.createObjectStore("previousSheets");
    transaction
      .objectStore("currentSheet")
      .put(defaultCurrentSheet(), "single");
  },
});

export async function initCurrentSheet() {
  await (await db).put("currentSheet", defaultCurrentSheet(), "single");
}

export async function getCurrentSheet() {
  const currentSheet = await (await db).get("currentSheet", "single");
  // DB は既存でもレコードだけ消えている場合があるため、例外にせず初期値で復旧する
  if (!currentSheet) {
    const sheet = defaultCurrentSheet();
    await (await db).put("currentSheet", sheet, "single");
    return sheet;
  }
  return currentSheet;
}

export async function updateCurrentSheet(sheet: CurrentSheet) {
  await (await db).put("currentSheet", sheet, "single");
}

export async function getPreviousSheet(id: string) {
  const sheet = await (await db).get("previousSheets", id);
  if (!sheet) throw new Error("no previous sheet found");
  return sheet;
}
export async function addPreviousSheet(sheet: Omit<PreviousSheet, "date">) {
  const id = nanoid();
  const date = Date.now();

  await (await db).add("previousSheets", { ...sheet, date }, id);
  return id;
}
