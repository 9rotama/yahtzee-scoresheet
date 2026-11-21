import { useQueryState } from "nuqs";
import type { Player, Rule } from "~/features/settings/models";
import type { CurrentSheet } from "~/models/sheet";
import type { ScoresYahtzee, ScoresYams } from "../utils/score-selects";
import { PlayerSwitch } from "./player-switch";
import { YahtzeeSheet } from "./yahtzee-sheet";
import { YamsSheet } from "./yams-sheet";

type Props = {
  players: Player[];
  rule: Rule;
  scores: CurrentSheet["scores"];
};

export function Game({ players, rule, scores }: Props) {
  const [currentPlayerId, setCurrentPlayerId] = useQueryState(
    "current-player-id",
    {
      defaultValue: players[0].id,
    },
  );
  const currentPlayerIdx = players.findIndex((p) => p.id === currentPlayerId);
  const currentPlayer = players[currentPlayerIdx];

  const handleRightClick = () => {
    const nextIndex = (currentPlayerIdx + 1) % players.length;
    setCurrentPlayerId(players[nextIndex].id);
  };

  const handleLeftClick = () => {
    const nextIndex = (currentPlayerIdx - 1 + players.length) % players.length;
    setCurrentPlayerId(players[nextIndex].id);
  };

  return (
    <div className="flex flex-col gap-2">
      <PlayerSwitch
        currentPlayer={currentPlayer}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
      {rule.name === "yahtzee" ? (
        <YahtzeeSheet
          players={players}
          currentPlayerIdx={currentPlayerIdx}
          initialScores={scores as ScoresYahtzee[]}
        />
      ) : rule.name === "yams" ? (
        <YamsSheet
          players={players}
          currentPlayerIdx={currentPlayerIdx}
          initialScores={scores as ScoresYams[]}
        />
      ) : undefined}
    </div>
  );
}
