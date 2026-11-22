import { getCurrentSheet, updateCurrentSheet } from "~/lib/db.client";
import type { Player, Rule } from "../models";

export async function getCurrentPlayers() {
  const currentSheet = await getCurrentSheet();

  const players = currentSheet.players;
  return players;
}

export async function updateCurrentPlayers(players: Player[]) {
  const currentSheet = await getCurrentSheet();

  await updateCurrentSheet({ ...currentSheet, players });
}

export async function getCurrentRule() {
  const currentSheet = await getCurrentSheet();

  const rule = currentSheet.rule;
  return rule;
}
export async function updateCurrentRule(rule: Rule) {
  const currentSheet = await getCurrentSheet();

  await updateCurrentSheet({ ...currentSheet, rule });
}
