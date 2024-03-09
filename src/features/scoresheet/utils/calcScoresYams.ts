import { MIN_SCORE_FOR_BONUS_YAMS } from "@/const/scoreSelects";
import { makeZeroOrPositive } from "./makeZeroOrPositive";
import { parseScoreToInt } from "./parseScoreToInt";

export default function calcScoresYams(scores: ScoreSelectValuesYams) {
  const upperSectionSum =
    parseScoreToInt(scores.aces) +
    parseScoreToInt(scores.twos) +
    parseScoreToInt(scores.threes) +
    parseScoreToInt(scores.fours) +
    parseScoreToInt(scores.fives) +
    parseScoreToInt(scores.sixes);
  const bonus =
    upperSectionSum >= MIN_SCORE_FOR_BONUS_YAMS
      ? 30 + makeZeroOrPositive(upperSectionSum - MIN_SCORE_FOR_BONUS_YAMS)
      : 0;

  const delta = makeZeroOrPositive(
    parseScoreToInt(scores.plus) - parseScoreToInt(scores.minus),
  );
  const lowerSectionSum =
    parseScoreToInt(scores.fourDice) +
    parseScoreToInt(scores.fullHouse) +
    parseScoreToInt(scores.sStraight) +
    parseScoreToInt(scores.rigole) +
    parseScoreToInt(scores.lStraight) +
    parseScoreToInt(scores.yahtzee);
  const total = upperSectionSum + bonus + delta + lowerSectionSum;

  return { upperSectionSum, bonus, delta, lowerSectionSum, total };
}
