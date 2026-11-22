import type { Player } from "~/features/settings/models";

export function resolveCurrentPlayerIdx(players: Player[], playerId: string) {
  const idx = players.findIndex((p) => p.id === playerId);
  return idx === -1 ? 0 : idx;
}
