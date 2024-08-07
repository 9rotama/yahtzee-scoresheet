import { db } from "@/libs/db";

export async function getPlayerList() {
  return db.playerList.toArray();
}

export async function savePlayerList(value: PlayerSetting[]) {
  const add = async (player: PlayerSetting, id: number) => {
    try {
      await db.playerList.add({
        id: id,
        name: player.name,
        colorHue: player.colorHue,
      });
    } catch (error) {
      throw new Error(`failed to add ${player.name}: ${error}`);
    }
  };

  await db.playerList.clear();
  await Promise.all(value.map(async (player, i) => add(player, i)));
}
