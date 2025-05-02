import { Delete, Edit2, Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { Player } from "../models";
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
  players: Player[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onEdit: (data: Player) => void;
};

export function PlayerList({ players, onAdd, onDelete, onEdit }: Props) {
  return (
    <>
      <ScrollArea className="relative p-4 w-full flex flex-col h-60">
        {players.length > 0 ? (
          <div className="flex flex-col gap-2">
            {players.map((player) => (
              <PlayerListItem
                key={player.id}
                player={player}
                onDelete={onDelete}
                onEdit={onEdit}
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
        onClick={onAdd}
      >
        <Plus />
      </Button>
      <div className="text-sm text-muted-foreground text-center mt-4">
        {players.length} / 8
      </div>
    </>
  );
}
