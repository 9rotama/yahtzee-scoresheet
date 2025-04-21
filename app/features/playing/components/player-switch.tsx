import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Player } from "~/features/settings/models";

type Props = {
  currentPlayer: Player;
  onRightClick: () => void;
  onLeftClick: () => void;
};

export function PlayerSwitch({
  currentPlayer,
  onLeftClick,
  onRightClick,
}: Props) {
  return (
    <div className="flex items-center justify-between flex-row">
      <Button
        aria-label="previous player"
        variant="secondary"
        onClick={onLeftClick}
      >
        <ChevronLeft />
      </Button>
      <p className="text-base font-bold">{currentPlayer.name}</p>
      <Button
        aria-label="next player"
        variant="secondary"
        onClick={onRightClick}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
