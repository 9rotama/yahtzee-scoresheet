import { db } from "@/libs/db";
import { useEffect, useState } from "react";

export default function usePlayerList() {
  const [playerList, setPlayerList] = useState<PlayerSetting[]>([]);
  const [playerNum, setPlayerNum] = useState<number>(0);
  const addPlayer = () => {
    setPlayerNum(playerNum + 1);
    setPlayerList([
      ...playerList,
      { name: `プレイヤー${playerNum}`, colorHue: 0 },
    ]);
  };

  const removePlayer = (idx: number) => {
    const playerListRemoved = playerList.slice();
    playerListRemoved.splice(idx, 1);
    setPlayerList(playerListRemoved);
  };

  const editPlayer = (idx: number) => {
    return (name: string, colorHue: number) => {
      setPlayerList(
        playerList.map((player, i) =>
          idx === i ? { name, colorHue } : player,
        ),
      );
    };
  };

  useEffect(() => {
    db.playerList.toArray().then((data) => setPlayerList(data));
  }, []);

  const savePlayerList = async () => {
    const add = async (player: PlayerSetting) => {
      try {
        const id = await db.playerList.add({
          name: player.name,
          colorHue: player.colorHue,
        });
      } catch (error) {
        throw new Error(`failed to add ${player.name}: ${error}`);
      }
    };

    await db.playerList.clear();
    await Promise.all(playerList.map(async (player) => add(player)));
  };

  return { playerList, addPlayer, removePlayer, editPlayer, savePlayerList };
}
