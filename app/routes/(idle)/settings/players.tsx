import { ArrowRight } from "lucide-react";
import {
  Link,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router";
import img from "~/assets/players.png";
import { Button } from "~/components/ui/button";
import { PlayerList } from "~/features/settings/components/player-list";
import {
  getCurrentPlayers,
  updateCurrentPlayers,
} from "~/features/settings/req/index.client";
import type { Route } from "./+types/players";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import type { Player } from "~/features/settings/models";
import { useMutation } from "@tanstack/react-query";

export async function clientLoader() {
  const data = await getCurrentPlayers();
  return data;
}

export function HydrateFallback() {
  return null;
}

export default function Players({ loaderData }: Route.ComponentProps) {
  const [players, setPlayers] = useState<Player[]>(loaderData || []);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateCurrentPlayers(players);
      navigate("/settings/rules");
    },
  });

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
    <div className="flex flex-col items-center">
      <img src={img} alt="players" width={370} height={320} />

      <h1 className="text-lg font-bold text-center mt-4">プレイヤーを追加</h1>
      <div className="w-full mt-8">
        <PlayerList
          players={players}
          onAdd={handleAddPlayer}
          onDelete={handleDeletePlayer}
          onEdit={handleEditPlayer}
        />
      </div>
      <Button
        variant="default"
        className="mt-16 w-full h-12 font-bold rounded-full"
        onClick={() => mutate()}
      >
        決定してルール選択へ <ArrowRight />
      </Button>
    </div>
  );
}
