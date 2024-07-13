import Dexie, { Table } from "dexie";

type PlayerSettingTable = {
  id?: number;
} & PlayerSetting;

type RuleTable = {
  rule: string;
};

type isGameInProgressTable = {
  isGameInProgress: string;
};

type CurrScoresYahtzeeTable = {
  id?: number;
} & ScoreSelectValuesYahtzee;

type CurrScoresYamsTable = {
  id?: number;
} & ScoreSelectValuesYams;

export class GameState extends Dexie {
  playerList!: Table<PlayerSettingTable>;
  rule!: Table<RuleTable>;
  isGameInProgress!: Table<isGameInProgressTable>;
  currScoresYahtzee!: Table<CurrScoresYahtzeeTable>;
  currScoresYams!: Table<CurrScoresYamsTable>;

  constructor() {
    super("gameState");
    this.version(1)
      .stores({
        playerList: "id, name, colorHue",
        rule: "rule",
        isGameInProgress: "isGameInProgress",
        currScoresYahtzee:
          "++id, aces, twos, threes, fours, fives, sixes, threeDice, fourDice, fullHouse, sStraight, lStraight, chance, yahtzee",
        currScoresYams:
          "++id, aces, twos, threes, fours, fives, sixes, plus, minus, fourDice, fullHouse, sStraight, lStraight, rigole, yahtzee",
      })
      .upgrade((tx) => {
        const defaultIsGameInProgress = [{ isGameInProgress: "false" }];
        tx.table("isGameInProgress").add(defaultIsGameInProgress);
      });
  }
}

export const db = new GameState();
