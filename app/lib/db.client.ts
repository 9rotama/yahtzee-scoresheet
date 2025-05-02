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
      { players: [], rule: { name: "yahtzee" }, scores: [] },
      "single",
    );
  } else {
    await db.add(
      "currentSheet",
      { players: [], rule: { name: "yahtzee" }, scores: [] },
      "single",
    );
  }
}

export async function getCurrentSheet() {
  const currentSheet = await db.get("currentSheet", "single");
  if (!currentSheet) throw new Error("no current sheet found");
  return currentSheet;
}

export async function updateCurrentSheet(sheet: CurrentSheet) {
  const currentSheet = await db.get("currentSheet", "single");
  if (!currentSheet) throw new Error("no current sheet found");

  await db.put("currentSheet", sheet, "single");
}

export async function getPreviousSheet(id: string) {
  const sheet = await db.get("previousSheets", id);
  if (!sheet) throw new Error("no previous sheet found");
  return sheet;
}
export async function addPreviousSheet(sheet: Omit<PreviousSheet, "date">) {
  const id = nanoid();
  const date = Date.now();

  await db.add("previousSheets", { ...sheet, date }, id);
  return id;
}
