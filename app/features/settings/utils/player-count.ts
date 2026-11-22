import { MAX_PLAYERS } from "../models";

export function canAddPlayer(playerCount: number) {
  return playerCount < MAX_PLAYERS;
}

export function canStartGame(playerCount: number) {
  return playerCount > 0 && playerCount <= MAX_PLAYERS;
}
