import { useEffect, useState } from "react";
import { getPlayerList, savePlayerList } from "../libs/indexedDbPlayer";

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
    getPlayerList().then((data) => setPlayerList(data));
  }, []);

  const savePlayer = async () => {
    await savePlayerList(playerList);
  };

  return { playerList, addPlayer, removePlayer, editPlayer, savePlayer };
}
