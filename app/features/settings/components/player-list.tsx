import { Delete, Edit2, Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { nanoid } from "nanoid";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { Player } from "../models/player";
import { PlayerListItem } from "./player-list-item";

function Empty() {
  return (
    <div className="text-muted-foreground flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
      <p className="text-sm font-bold">プレイヤーが登録されていません</p>
      <p className="text-xs">
        下のボタンよりプレイヤーを1人以上追加してください
      </p>
    </div>
  );
}

type Props = {
  defaultPlayers: Player[] | undefined;
};

export function PlayerList({ defaultPlayers }: Props) {
  const [players, setPlayers] = useState<Player[]>(defaultPlayers || []);

  const handleAddPlayer = useCallback(() => {
    const newPlayer: Player = {
      id: nanoid(),
      name: `プレイヤー ${players.length + 1}`,
    };
    setPlayers((prev) => [...prev, newPlayer]);
  }, [players.length]);

  const handleDeletePlayer = useCallback((id: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== id));
  }, []);

  const handleEditPlayer = useCallback((data: Player) => {
    setPlayers((prev) => prev.map((p) => (p.id === data.id ? data : p)));
  }, []);

  return (
    <>
      <ScrollArea className="relative p-4 w-full flex flex-col h-60">
        {players.length > 0 ? (
          <div className="flex flex-col gap-2">
            {players.map((player) => (
              <PlayerListItem
                key={player.id}
                player={player}
                onDelete={handleDeletePlayer}
                onEdit={handleEditPlayer}
              />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </ScrollArea>

      <Button
        aria-label="add player"
        variant="outline"
        className="mt-2 w-full"
        onClick={handleAddPlayer}
      >
        <Plus />
      </Button>
      <div className="text-sm text-muted-foreground text-center mt-4">
        {players.length} / 8
      </div>
    </>
  );
}
