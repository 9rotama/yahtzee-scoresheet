import { range } from "@/utils/range";

export const NUM_DICE = 5;

const SCORE_SELECTS_YATHZEE_NUMBER: { [key in YahtzeeCategories]: number[] } = {
  aces: [...Array(NUM_DICE + 1)].map((_, i) => i),
  twos: [...Array(NUM_DICE + 1)].map((_, i) => i * 2),
  threes: [...Array(NUM_DICE + 1)].map((_, i) => i * 3),
  fours: [...Array(NUM_DICE + 1)].map((_, i) => i * 4),
  fives: [...Array(NUM_DICE + 1)].map((_, i) => i * 5),
  sixes: [...Array(NUM_DICE + 1)].map((_, i) => i * 6),
  threeDice: [0, ...range(3, 6 * NUM_DICE)],
  fourDice: [0, ...range(4, 6 * NUM_DICE)],
  fullHouse: [0, 25],
  sStraight: [0, 30],
  lStraight: [0, 40],
  chance: range(5, 6 * NUM_DICE),
  yathzee: [0, 50],
};

export const SCORE_SELECTS_YATHZEE = Object.fromEntries(
  Object.entries(SCORE_SELECTS_YATHZEE_NUMBER).map(([key, value]) => [
    key,
    Array.isArray(value) ? value.map(String) : value,
  ]),
) as { [key in YahtzeeCategories]: string[] };

const SCORE_SELECTS_YAMS_NUMBER: { [key in YamsCategories]: number[] } = {
  aces: [...Array(NUM_DICE + 1)].map((_, i) => i),
  twos: [...Array(NUM_DICE + 1)].map((_, i) => i * 2),
  threes: [...Array(NUM_DICE + 1)].map((_, i) => i * 3),
  fours: [...Array(NUM_DICE + 1)].map((_, i) => i * 4),
  fives: [...Array(NUM_DICE + 1)].map((_, i) => i * 5),
  sixes: [...Array(NUM_DICE + 1)].map((_, i) => i * 6),
  plus: range(5, 6 * NUM_DICE),
  minus: range(5, 6 * NUM_DICE),
  fourDice: [0, ...range(40 + 4, 40 + 6 * NUM_DICE)],
  fullHouse: [0, ...range(37, 30 + 6 * NUM_DICE)],
  sStraight: [0, 45],
  lStraight: [0, 50],
  rigole: [0, 50],
  yathzee: [0, ...[...Array(6)].map((_, i) => 50 + (i + 1) * NUM_DICE)],
};

export const SCORE_SELECTS_YAMS = Object.fromEntries(
  Object.entries(SCORE_SELECTS_YAMS_NUMBER).map(([key, value]) => [
    key,
    Array.isArray(value) ? value.map(String) : value,
  ]),
) as { [key in YamsCategories]: string[] };
