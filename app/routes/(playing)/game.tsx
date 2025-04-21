import {
  getCurrentPlayers,
  getCurrentRule,
} from "~/features/settings/req/index.client";
import type { Route } from "./+types/game";
import { Game } from "~/features/playing/components/game";

export async function clientLoader() {
  const players = await getCurrentPlayers();
  const rule = await getCurrentRule();

  return { players, rule };
}

export function HydrateFallback() {
  return null;
}

export default function GamePage({ loaderData }: Route.ComponentProps) {
  const { players, rule } = loaderData;
  if (!players || players.length === 0 || !rule) return;
  return (
    <div className="pt-1">
      <Game players={players} rule={rule} />
    </div>
  );
}
