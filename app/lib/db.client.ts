import { openDB, type DBSchema } from "idb";
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

const db = await openDB<DB>("yams-sheet", 1, {
  upgrade(db) {
    db.createObjectStore("currentSheet");
    initCurrentSheet();
    db.createObjectStore("previousSheets");
  },
});

export async function initCurrentSheet() {
  const currentSheet = await db.get("currentSheet", "single");
  if (currentSheet) {
    await db.put(
      "currentSheet",
      { players: [], rule: undefined, scores: undefined },
      "single",
    );
  } else {
    await db.add(
      "currentSheet",
      { players: [], rule: undefined, scores: undefined },
      "single",
    );
  }
}

export async function getCurrentSheet() {
  const currentSheet = await db.get("currentSheet", "single");
  return currentSheet;
}

export async function updateCurrentSheet(sheet: CurrentSheet) {
  const currentSheet = await db.get("currentSheet", "single");
  if (!currentSheet) throw new Error("no current sheet found");

  await db.put("currentSheet", sheet, "single");
}
