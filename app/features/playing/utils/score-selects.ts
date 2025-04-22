export const diceNum = 5;

export const minBonusYahtzee = 60;
export const minBonusYams = 63;

export const scoreSelectionsYahtzee: {
  [key in YahtzeeCategories]: (number | undefined)[];
} = {
  aces: [undefined, 0, 1, 2, 3, 4, 5],
  twos: [undefined, 0, 2, 4, 6, 8, 10],
  threes: [undefined, 0, 3, 6, 9, 12, 15],
  fours: [undefined, 0, 4, 8, 12, 16, 20],
  fives: [undefined, 0, 5, 10, 15, 20, 25],
  sixes: [undefined, 0, 6, 12, 18, 24, 30],
  "three-dice": [undefined, 0, ...range(3, 6 * diceNum, 1)],
  "four-dice": [undefined, 0, ...range(4, 6 * diceNum, 1)],
  "full-house": [undefined, 0, 25],
  "s-straight": [undefined, 0, 30],
  "l-straight": [undefined, 0, 40],
  chance: [undefined, ...range(5, 6 * diceNum, 1)],
  yahtzee: [undefined, 0, 50],
} as const;

export const scoreSelectionsYams: {
  [key in YamsCategories]: (undefined | number)[];
} = {
  aces: [undefined, 0, 1, 2, 3, 4, 5],
  twos: [undefined, 0, 2, 4, 6, 8, 10],
  threes: [undefined, 0, 3, 6, 9, 12, 15],
  fours: [undefined, 0, 4, 8, 12, 16, 20],
  fives: [undefined, 0, 5, 10, 15, 20, 25],
  sixes: [undefined, 0, 6, 12, 18, 24, 30],
  plus: [undefined, ...range(5, 6 * diceNum, 1)],
  minus: [undefined, ...range(5, 6 * diceNum, 1)],
  "four-dice": [undefined, 0, ...range(40 + 4, 40 + 6 * diceNum, 1)],
  "full-house": [undefined, 0, ...range(37, 30 + 6 * diceNum, 1)],
  "s-straight": [undefined, 0, 45],
  "l-straight": [undefined, 0, 50],
  rigole: [undefined, 0, 50],
  yahtzee: [
    undefined,
    0,
    ...Array.from({ length: 6 }, (_, i) => 50 + (i + 1) * diceNum),
  ],
};

function range(start: number, end: number, step: number): number[] {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}
