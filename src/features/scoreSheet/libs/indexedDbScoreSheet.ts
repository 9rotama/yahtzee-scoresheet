import { SCORE_NONE_YAHTZEE, SCORE_NONE_YAMS } from "@/const/scoreValues";
import { getPlayerList } from "@/features/player/libs/indexedDbPlayer";
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
    await db.currScoresYams.update(playerIdx, {
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
    await db.currScoresYahtzee.update(playerIdx, {
      [category]: newValue,
    });
  } catch (error) {
    throw new Error(`failed to add ${playerName}: ${error}`);
  }
}

export async function addNoneScoresYahtzee() {
  const add = async (playerId: number) => {
    try {
      await db.currScoresYahtzee.add({ id: playerId, ...SCORE_NONE_YAHTZEE });
    } catch (error) {
      throw new Error(`failed to add none scores: ${error}`);
    }
  };
  const playerNum = (await getPlayerList()).length;

  await db.currScoresYahtzee.clear();
  await Promise.all([...new Array(playerNum)].map(async (_, i) => add(i)));
}

export async function addNoneScoresYams() {
  const add = async (playerId: number) => {
    try {
      await db.currScoresYams.add({ id: playerId, ...SCORE_NONE_YAMS });
    } catch (error) {
      throw new Error(`failed to add none scores: ${error}`);
    }
  };
  const playerNum = (await getPlayerList()).length;

  await db.currScoresYams.clear();
  await Promise.all([...new Array(playerNum)].map(async (_, i) => add(i)));
}
