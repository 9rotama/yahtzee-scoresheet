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

const db = openDB<DB>("yams-sheet", 1, {
  upgrade(db) {
    db.createObjectStore("currentSheet");
    initCurrentSheet();
    db.createObjectStore("previousSheets");
  },
});

export async function initCurrentSheet() {
  const currentSheet = await (await db).get("currentSheet", "single");
  if (currentSheet) {
    await (await db).put(
      "currentSheet",
      { players: [], rule: { name: "yahtzee" }, scores: [] },
      "single",
    );
  } else {
    await (await db).add(
      "currentSheet",
      { players: [], rule: { name: "yahtzee" }, scores: [] },
      "single",
    );
  }
}

export async function getCurrentSheet() {
  const currentSheet = await (await db).get("currentSheet", "single");
  if (!currentSheet) throw new Error("no current sheet found");
  return currentSheet;
}

export async function updateCurrentSheet(sheet: CurrentSheet) {
  const currentSheet = await (await db).get("currentSheet", "single");
  if (!currentSheet) throw new Error("no current sheet found");

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

export type PreviousSheetWithId = PreviousSheet & { id: string };

export async function listPreviousSheets(): Promise<PreviousSheetWithId[]> {
  // キーは nanoid で時系列順ではないため、date インデックスを張る代わりに全件取得してから並べ替える（件数が少なく DB バージョンを上げるほどではない）
  const sheets: PreviousSheetWithId[] = [];
  let cursor = await (await db)
    .transaction("previousSheets")
    .store.openCursor();
  while (cursor) {
    sheets.push({ ...cursor.value, id: cursor.key });
    cursor = await cursor.continue();
  }
  return sheets.sort((a, b) => b.date - a.date);
}

export async function deletePreviousSheet(id: string) {
  await (await db).delete("previousSheets", id);
}
