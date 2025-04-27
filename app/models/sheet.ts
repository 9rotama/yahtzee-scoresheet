import type {
  ScoresYahtzee,
  ScoresYams,
} from "~/features/playing/utils/score-selects";
import type { Player, Rule } from "~/features/settings/models";

export interface CurrentSheet {
  players: Player[];
  rule: Rule | undefined;
  scores: ScoresYahtzee[] | ScoresYams[] | undefined;
}

export interface PreviousSheet {
  players: Player[];
  rule: Rule;
  scores: ScoresYahtzee[] | ScoresYams[];
  date: number;
}
