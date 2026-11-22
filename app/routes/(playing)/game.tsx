import { redirect } from "react-router";
import { Game } from "~/features/playing/components/game";
import { getCurrentScores } from "~/features/playing/req/index.client";
import {
  getCurrentPlayers,
  getCurrentRule,
} from "~/features/settings/req/index.client";
import { canStartGame } from "~/features/settings/utils/player-count";
import type { Route } from "./+types/game";

export async function clientLoader() {
  const players = await getCurrentPlayers();
  if (!canStartGame(players.length)) throw redirect("/settings/players");
  const rule = await getCurrentRule();
  const scores = await getCurrentScores();

  return { players, rule, scores };
}

export function HydrateFallback() {
  return null;
}

export default function GamePage({ loaderData }: Route.ComponentProps) {
  const { players, rule, scores } = loaderData;
  return (
    <div className="pt-1">
      <Game players={players} rule={rule} scores={scores} />
    </div>
  );
}
