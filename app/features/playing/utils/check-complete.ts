import type { ScoresYahtzee, ScoresYams } from "./score-selects";

export function checkComplete(scores: (ScoresYahtzee | ScoresYams)[]) {
  return scores.every((score) => {
    return Object.values(score).every((idx) => idx !== 0);
  });
}
