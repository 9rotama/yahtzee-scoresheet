import { openDB, type DBSchema } from "idb";
import type { Player, Rule } from "~/features/settings/models";

interface DB extends DBSchema {
  currentSheet: {
    key: "single";
    value: { players: Player[]; rule: Rule };
  };
  previousSheets: {
    key: string;
    value: { players: Player[]; rule: Rule; date: number };
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
      { players: [], rule: { name: "yams" } },
      "single",
    );
  } else {
    await db.add(
      "currentSheet",
      { players: [], rule: { name: "yams" } },
      "single",
    );
  }
}

export async function getCurrentSheet() {
  const currentSheet = await db.get("currentSheet", "single");
  return currentSheet;
}

export async function updateCurrentSheet(sheet: {
  players: Player[];
  rule: Rule;
}) {
  const currentSheet = await db.get("currentSheet", "single");
  if (!currentSheet) throw new Error("no current sheet found");

  await db.put("currentSheet", sheet, "single");
}
