import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Table, TableBody } from "~/components/ui/table";
import type { Player } from "~/features/settings/models";
import { setIsCompleteContext } from "../contexts/is-complete";
import { updateCurrentScoresYahtzee } from "../req/index.client";
import { calcYahtzee } from "../utils/calc";
import type { YahtzeeCategories } from "../utils/categories";
import { checkComplete } from "../utils/check-complete";
import type { Index, ScoresYahtzee } from "../utils/score-selects";
import { yahtzeeItems as items } from "../utils/yahtzee-items";
import { SheetRow } from "./sheet-row";
import { SheetSelect } from "./sheet-select";

function getInitScoreSelections(playerId: string): ScoresYahtzee {
  return {
    playerId,
    aces: 0 as Index,
    twos: 0 as Index,
    threes: 0 as Index,
    fours: 0 as Index,
    fives: 0 as Index,
    sixes: 0 as Index,
    "three-dice": 0 as Index,
    "four-dice": 0 as Index,
    "full-house": 0 as Index,
    "s-straight": 0 as Index,
    "l-straight": 0 as Index,
    chance: 0 as Index,
    yahtzee: 0 as Index,
  };
}

const firstGroup = [
  "aces",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
] as const;

const secondGroup = ["chance"] as const;

const thirdGroup = [
  "three-dice",
  "four-dice",
  "full-house",
  "s-straight",
  "l-straight",
  "yahtzee",
] as const;

type Props = {
  players: Player[];
  currentPlayerIdx: number;
  initialScores: ScoresYahtzee[];
};

export function YahtzeeSheet({
  players,
  currentPlayerIdx,
  initialScores,
}: Props) {
  const [scores, setScores] = useState<ScoresYahtzee[]>(
    initialScores.length === 0
      ? players.map((p) => getInitScoreSelections(p.id))
      : initialScores,
  );
  const currentPlayerScores = scores[currentPlayerIdx];
  const setIsComplete = useContext(setIsCompleteContext);

  // 判定を保存処理の中で行うと、/game を開き直したときに得点を選び直すまで判定されないため、scores から都度導出する
  useEffect(() => {
    setIsComplete(checkComplete(scores));
  }, [scores, setIsComplete]);

  // 保存する scores は引数で受け取る。mutationFn のクロージャの scores は setScores 直後だと更新前の値になりうる
  const { mutate } = useMutation({
    mutationFn: updateCurrentScoresYahtzee,
  });

  const handleSelect = (category: YahtzeeCategories, idx: number) => {
    const newScores = [...scores];
    newScores[currentPlayerIdx] = {
      ...newScores[currentPlayerIdx],
      [category]: idx,
    };
    setScores(newScores);
    mutate(newScores);
  };

  const { smallTotal, bonus, total } = calcYahtzee(currentPlayerScores);

  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableBody>
            {firstGroup.map((c) => (
              <SheetRow
                key={c}
                item={c}
                name={items[c].name}
                score={
                  <SheetSelect
                    name={items[c].name}
                    selectedIdx={currentPlayerScores[c]}
                    selections={items[c].selections}
                    onSelect={(idx) => handleSelect(c, idx)}
                  />
                }
              />
            ))}
            <SheetRow
              variant="auto"
              item="subtotal"
              name="小計"
              score={<p>{smallTotal}</p>}
            />
            <SheetRow
              variant="auto"
              item="bonus"
              name="ボーナス"
              score={bonus}
            />
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableBody>
            {secondGroup.map((c) => (
              <SheetRow
                key={c}
                item={c}
                name={items[c].name}
                score={
                  <SheetSelect
                    name={items[c].name}
                    selectedIdx={currentPlayerScores[c]}
                    selections={items[c].selections}
                    onSelect={(idx) => handleSelect(c, idx)}
                  />
                }
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableBody>
            {thirdGroup.map((c) => (
              <SheetRow
                key={c}
                item={c}
                name={items[c].name}
                score={
                  <SheetSelect
                    name={items[c].name}
                    selectedIdx={currentPlayerScores[c]}
                    selections={items[c].selections}
                    onSelect={(idx) => handleSelect(c, idx)}
                  />
                }
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableBody>
            <SheetRow
              variant="auto"
              item="total"
              name="総合得点"
              score={<p>{total}</p>}
            />
          </TableBody>
        </Table>
      </div>
    </>
  );
}
