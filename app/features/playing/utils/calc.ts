import type { YahtzeeCategories, YamsCategories } from "./categories";
import type { ScoresYahtzee, ScoresYams } from "./score-selects";
import { yahtzeeItems } from "./yahtzee-items";
import { yamsItems } from "./yams-items";

export function calcYahtzee(scoreSels: ScoresYahtzee) {
  const scores: { [key in YahtzeeCategories]: number } = {
    aces: yahtzeeItems.aces.selections[scoreSels.aces] ?? 0,
    twos: yahtzeeItems.twos.selections[scoreSels.twos] ?? 0,
    threes: yahtzeeItems.threes.selections[scoreSels.threes] ?? 0,
    fours: yahtzeeItems.fours.selections[scoreSels.fours] ?? 0,
    fives: yahtzeeItems.fives.selections[scoreSels.fives] ?? 0,
    sixes: yahtzeeItems.sixes.selections[scoreSels.sixes] ?? 0,
    "three-dice":
      yahtzeeItems["three-dice"].selections[scoreSels["three-dice"]] ?? 0,
    "four-dice":
      yahtzeeItems["four-dice"].selections[scoreSels["four-dice"]] ?? 0,
    "full-house":
      yahtzeeItems["full-house"].selections[scoreSels["full-house"]] ?? 0,
    "s-straight":
      yahtzeeItems["s-straight"].selections[scoreSels["s-straight"]] ?? 0,
    "l-straight":
      yahtzeeItems["l-straight"].selections[scoreSels["l-straight"]] ?? 0,
    chance: yahtzeeItems.chance.selections[scoreSels.chance] ?? 0,
    yahtzee: yahtzeeItems.yahtzee.selections[scoreSels.yahtzee] ?? 0,
  };
  const smallTotal =
    scores.aces +
    scores.twos +
    scores.threes +
    scores.fours +
    scores.fives +
    scores.sixes;
  const bonus = smallTotal >= 63 ? 35 : 0;
  const total =
    smallTotal +
    bonus +
    scores["three-dice"] +
    scores["four-dice"] +
    scores["full-house"] +
    scores["s-straight"] +
    scores["l-straight"] +
    scores.chance +
    scores.yahtzee;
  return {
    smallTotal,
    bonus,
    total: smallTotal + bonus + total,
  };
}

export function calcYams(scoreSels: ScoresYams) {
  const scores: { [key in YamsCategories]: number } = {
    aces: yamsItems.aces.selections[scoreSels.aces] ?? 0,
    twos: yamsItems.twos.selections[scoreSels.twos] ?? 0,
    threes: yamsItems.threes.selections[scoreSels.threes] ?? 0,
    fours: yamsItems.fours.selections[scoreSels.fours] ?? 0,
    fives: yamsItems.fives.selections[scoreSels.fives] ?? 0,
    sixes: yamsItems.sixes.selections[scoreSels.sixes] ?? 0,
    plus: yamsItems.plus.selections[scoreSels.plus] ?? 0,
    minus: yamsItems.minus.selections[scoreSels.minus] ?? 0,
    "four-dice": yamsItems["four-dice"].selections[scoreSels["four-dice"]] ?? 0,
    "full-house":
      yamsItems["full-house"].selections[scoreSels["full-house"]] ?? 0,
    "s-straight":
      yamsItems["s-straight"].selections[scoreSels["s-straight"]] ?? 0,
    "l-straight":
      yamsItems["l-straight"].selections[scoreSels["l-straight"]] ?? 0,
    rigole: yamsItems.rigole.selections[scoreSels.rigole] ?? 0,
    yahtzee: yamsItems.yahtzee.selections[scoreSels.yahtzee] ?? 0,
  };
  const smallTotal =
    (scores.aces ?? 0) +
    (scores.twos ?? 0) +
    (scores.threes ?? 0) +
    (scores.fours ?? 0) +
    (scores.fives ?? 0) +
    (scores.sixes ?? 0);
  const bonus = smallTotal >= 63 ? 35 : 0;

  const plus = scores.plus ?? 0;
  const minus = scores.minus ?? 0;

  const delta =
    plus !== undefined && minus !== undefined
      ? Math.max(plus - minus, 0)
      : undefined;
  const total =
    smallTotal +
    bonus +
    (delta ?? 0) +
    (scores["four-dice"] ?? 0) +
    (scores["full-house"] ?? 0) +
    (scores["s-straight"] ?? 0) +
    (scores["l-straight"] ?? 0) +
    (scores.rigole ?? 0) +
    (scores.yahtzee ?? 0);
  return {
    smallTotal,
    bonus,
    delta,
    total,
  };
}
