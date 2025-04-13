import { ColorDot } from "~/components/color-dot";
import { PlayerEdit } from "./player-edit";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Player } from "../models";

type Props = {
  player: Player;
  onDelete: (id: string) => void;
  onEdit: (data: Player) => void;
};

export function PlayerListItem({ player, onDelete, onEdit }: Props) {
  return (
    <div
      key={player.id}
      className="flex items-center justify-between border py-2 px-3 rounded-md"
    >
      <div className="flex items-center gap-2">
        <ColorDot color="bg-red-500" size="size-2" />
        <p className="text-sm">{player.name}</p>
      </div>

      <div className="flex flex-row gap-1">
        <PlayerEdit player={player} onSubmit={onEdit} />
        <Button
          variant="ghost"
          className="text-destructive"
          onClick={() => onDelete(player.id)}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
