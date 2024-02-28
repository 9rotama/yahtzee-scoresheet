import Dexie, { Table } from "dexie";

type PlayerSettingTable = {
  id?: number;
} & PlayerSetting;

type RuleTable = {
  rule: string;
};

export class GameState extends Dexie {
  playerList!: Table<PlayerSettingTable>;
  rule!: Table<RuleTable>;

  constructor() {
    super("gameState");
    this.version(1).stores({
      playerList: "++id, name, colorHue",
      rule: "rule",
    });
  }
}

export const db = new GameState();
