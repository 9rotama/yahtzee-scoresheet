export type Player = {
  id: string;
  name: string;
};

export type Rule = { name: "yams" } | { name: "yahtzee" };

export const MAX_PLAYERS = 8;
