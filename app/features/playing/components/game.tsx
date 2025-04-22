import { useQueryState } from "nuqs";
import type { Player, Rule } from "~/features/settings/models";
import { PlayerSwitch } from "./player-switch";
import { useCallback } from "react";
import { YahtzeeSheet } from "./yahtzee-sheet";
import { YamsSheet } from "./yams-sheet";

type Props = {
  players: Player[];
  rule: Rule;
};

export function Game({ players, rule }: Props) {
  const [currentPlayerId, setCurrentPlayerId] = useQueryState(
    "current-player-id",
    {
      defaultValue: players[0].id,
    },
  );
  const currentPlayerIndex = players.findIndex((p) => p.id === currentPlayerId);
  const currentPlayer = players[currentPlayerIndex];

  const handleRightClick = useCallback(() => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerId(players[nextIndex].id);
  }, [players, currentPlayerIndex, setCurrentPlayerId]);

  const handleLeftClick = useCallback(() => {
    const nextIndex =
      (currentPlayerIndex - 1 + players.length) % players.length;
    setCurrentPlayerId(players[nextIndex].id);
  }, [players, currentPlayerIndex, setCurrentPlayerId]);

  return (
    <div className="flex flex-col gap-2">
      <PlayerSwitch
        currentPlayer={currentPlayer}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
      {rule.name === "yahtzee" ? <YahtzeeSheet /> : <YamsSheet />}
    </div>
  );
}
