import Dexie, { Table } from "dexie";

type PlayerSettingTable = {
  id?: number;
} & PlayerSetting;

type RuleTable = {
  rule: string;
};

type CurrentPageTable = {
  currentPage: string;
};

type CurrScoresYahtzeeTable = {
  id?: number;
} & ScoreSelectValuesYahtzee;

type CurrScoresYamsTable = {
  id?: number;
} & ScoreSelectValuesYams;

export class GameState extends Dexie {
  playerList!: Table<PlayerSettingTable>;
  currentPage!: Table<CurrentPageTable>;
  rule!: Table<RuleTable>;
  currScoresYahtzee!: Table<CurrScoresYahtzeeTable>;
  currScoresYams!: Table<CurrScoresYamsTable>;

  constructor() {
    super("gameState");
    this.version(1).stores({
      currentPage: "currentPage",
      playerList: "++id, name, colorHue",
      rule: "rule",
      currScoresYahtzee:
        "++id, aces, twos, threes, fours, fives, sixes, threeDice, fourDice, fullHouse, sStraight, lStraight, chance, yahtzee",
      currScoresYams:
        "++id, aces, twos, threes, fours, fives, sixes, plus, minus, fourDice, fullHouse, sStraight, lStraight, rigole, yahtzee",
    });
  }
}

export const db = new GameState();
