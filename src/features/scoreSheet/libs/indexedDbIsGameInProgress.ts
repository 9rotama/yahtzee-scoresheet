import { db } from "@/libs/db";

export async function getIsGameInProgress() {
  return db.isGameInProgress
    .toArray()
    .then((data) => (data.length === 0 ? "false" : "true"));
}

export async function saveIsGameInProgress(value: "true" | "false") {
  await db.isGameInProgress.clear();
  try {
    await db.isGameInProgress.add({ isGameInProgress: value });
  } catch (error) {
    throw new Error(`failed to save isGameInProgress: ${error}`);
  }
}
