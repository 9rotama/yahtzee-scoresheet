import { calcYahtzee, calcYams } from "~/features/playing/utils/calc";
import type {
  ScoresYahtzee,
  ScoresYams,
} from "~/features/playing/utils/score-selects";
import type { PreviousSheet } from "~/models/sheet";

export type RankedResult = {
  playerId: string;
  playerName: string;
  score: number;
  rank: number;
};

type Sheet = Pick<PreviousSheet, "players" | "rule" | "scores">;

function calcTotals({ rule, scores }: Sheet) {
  if (rule.name === "yahtzee") {
    return (scores as ScoresYahtzee[]).map((s) => ({
      playerId: s.playerId,
      score: calcYahtzee(s).total,
    }));
  }
  if (rule.name === "yams") {
    return (scores as ScoresYams[]).map((s) => ({
      playerId: s.playerId,
      score: calcYams(s).total,
    }));
  }
  throw new Error("Invalid rule");
}

export function rankPlayers(sheet: Sheet): RankedResult[] {
  const sorted = calcTotals(sheet)
    .map(({ playerId, score }) => ({
      playerId,
      score,
      playerName: sheet.players.find((p) => p.id === playerId)?.name ?? "",
    }))
    .sort((a, b) => b.score - a.score);

  // 同点は同順位にする（1, 1, 3 ...）。配列の添字をそのまま順位にすると同点でも順位が分かれてしまう
  return sorted.map((result) => ({
    ...result,
    rank: 1 + sorted.filter((other) => other.score > result.score).length,
  }));
}
