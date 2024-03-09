import { MIN_SCORE_FOR_BONUS_YAHTZEE } from "@/const/scoreSelects";
import { parseScoreToInt } from "./parseScoreToInt";

export default function calcScoresYahtzee(scores: ScoreSelectValuesYahtzee) {
  const upperSectionSum =
    parseScoreToInt(scores.aces) +
    parseScoreToInt(scores.twos) +
    parseScoreToInt(scores.threes) +
    parseScoreToInt(scores.fours) +
    parseScoreToInt(scores.fives) +
    parseScoreToInt(scores.sixes);
  const bonus = upperSectionSum >= MIN_SCORE_FOR_BONUS_YAHTZEE ? 35 : 0;

  const lowerSectionSum =
    parseScoreToInt(scores.threeDice) +
    parseScoreToInt(scores.fourDice) +
    parseScoreToInt(scores.fullHouse) +
    parseScoreToInt(scores.sStraight) +
    parseScoreToInt(scores.lStraight) +
    parseScoreToInt(scores.yahtzee);
  const total = upperSectionSum + bonus + lowerSectionSum;

  return { upperSectionSum, bonus, lowerSectionSum, total };
}
