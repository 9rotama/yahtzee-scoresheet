import { db } from "@/libs/db";

export async function getCurrScoresYahtzee() {
  return db.currScoresYahtzee.toArray();
}

export async function getCurrScoresYams() {
  return db.currScoresYams.toArray();
}

export async function saveCurrScoresYams(
  playerIdx: number,
  playerName: string,
  category: YamsCategories,
  newValue: string,
) {
  try {
    await db.currScoresYams.update(playerIdx + 1, {
      [category]: newValue,
    });
  } catch (error) {
    throw new Error(`failed to add ${playerName}: ${error}`);
  }
}

export async function saveCurrScoresYahtzee(
  playerIdx: number,
  playerName: string,
  category: YahtzeeCategories,
  newValue: string,
) {
  try {
    await db.currScoresYahtzee.update(playerIdx + 1, {
      [category]: newValue,
    });
  } catch (error) {
    throw new Error(`failed to add ${playerName}: ${error}`);
  }
}
