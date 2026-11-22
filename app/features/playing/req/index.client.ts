import { getCurrentSheet, updateCurrentSheet } from "~/lib/db.client";
import type { ScoresYahtzee, ScoresYams } from "../utils/score-selects";

export async function getCurrentScores() {
  const currentSheet = await getCurrentSheet();

  const scores = currentSheet.scores;
  return scores;
}

export async function updateCurrentScoresYahtzee(scores: ScoresYahtzee[]) {
  const currentSheet = await getCurrentSheet();

  await updateCurrentSheet({ ...currentSheet, scores });
}

export async function updateCurrentScoresYams(scores: ScoresYams[]) {
  const currentSheet = await getCurrentSheet();

  await updateCurrentSheet({ ...currentSheet, scores });
}

export async function clearCurrentScores() {
  const currentSheet = await getCurrentSheet();
  await updateCurrentSheet({ ...currentSheet, scores: [] });
}
