import {
  getCurrentPlayers,
  getCurrentRule,
} from "~/features/settings/req/index.client";
import type { Route } from "./+types/game";
import { Game } from "~/features/playing/components/game";
import { getCurrentScores } from "~/features/playing/req/index.client";

export async function clientLoader() {
  const players = await getCurrentPlayers();
  const rule = await getCurrentRule();
  const scores = await getCurrentScores();

  return { players, rule, scores };
}

export function HydrateFallback() {
  return null;
}

export default function GamePage({ loaderData }: Route.ComponentProps) {
  const { players, rule, scores } = loaderData;
  if (players.length === 0) return;
  return (
    <div className="pt-1">
      <Game players={players} rule={rule} scores={scores} />
    </div>
  );
}
