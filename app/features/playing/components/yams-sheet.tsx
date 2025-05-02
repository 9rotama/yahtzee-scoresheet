import { Table, TableBody } from "~/components/ui/table";
import { SheetRow } from "./sheet-row";
import { SheetSelect } from "./sheet-select";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  minBonusYams,
  scoreSelectionsYams,
  type Index,
  type ScoresYams,
} from "../utils/score-selects";
import type { Player } from "~/features/settings/models";
import { useMutation } from "@tanstack/react-query";
import { updateCurrentScoresYams } from "../req/index.client";
import type { YamsCategories } from "../utils/categories";
import { setIsCompleteContext } from "~/routes/(playing)/layout";
import { checkComplete } from "../utils/check-complete";
import { yamsItems as items } from "../utils/yams-items";
import { calcYams } from "../utils/calc";

function getInitScoreSelections(playerId: string): ScoresYams {
  return {
    playerId,
    aces: 0 as Index,
    twos: 0 as Index,
    threes: 0 as Index,
    fours: 0 as Index,
    fives: 0 as Index,
    sixes: 0 as Index,
    "four-dice": 0 as Index,
    "full-house": 0 as Index,
    "s-straight": 0 as Index,
    "l-straight": 0 as Index,
    plus: 0 as Index,
    minus: 0 as Index,
    rigole: 0 as Index,
    yahtzee: 0 as Index,
  };
}

const firstGroup: YamsCategories[] = [
  "aces",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
] as const;

const secondGroup: YamsCategories[] = ["plus", "minus"] as const;

const thirdGroup: YamsCategories[] = [
  "four-dice",
  "full-house",
  "s-straight",
  "l-straight",
  "rigole",
  "yahtzee",
] as const;

type Props = {
  players: Player[];
  currentPlayerIdx: number;
  initialScores: ScoresYams[];
};

export function YamsSheet({ players, currentPlayerIdx, initialScores }: Props) {
  const [scores, setScores] = useState<ScoresYams[]>(
    initialScores.length === 0
      ? players.map((p) => getInitScoreSelections(p.id))
      : initialScores,
  );

  const currentPlayerScores = scores[currentPlayerIdx];

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateCurrentScoresYams(scores);
      setIsComplete(checkComplete(scores));
    },
  });
  const setIsComplete = useContext(setIsCompleteContext);

  useEffect(() => {
    setIsComplete(checkComplete(scores));
  }, [scores, setIsComplete]);

  const handleSelect = useCallback(
    (category: YamsCategories, idx: number) => {
      setScores((prev) => {
        const newScores = [...prev];
        newScores[currentPlayerIdx] = {
          ...newScores[currentPlayerIdx],
          [category]: idx,
        };
        return newScores;
      });
      mutate();
    },
    [currentPlayerIdx, mutate],
  );

  const { smallTotal, bonus, delta, total } = calcYams(currentPlayerScores);

  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableBody>
            {firstGroup.map((c) => (
              <SheetRow
                key={c}
                name={<p>{items[c].name}</p>}
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
              name={<p>小計</p>}
              score={<p>{smallTotal}</p>}
            />
            <SheetRow variant="auto" name={<p>ボーナス</p>} score={bonus} />
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableBody>
            {secondGroup.map((c) => (
              <SheetRow
                key={c}
                name={<p>{items[c].name}</p>}
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
              name={<p>デルタ</p>}
              score={<p>{delta !== undefined ? delta : "-"}</p>}
            />
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableBody>
            {thirdGroup.map((c) => (
              <SheetRow
                key={c}
                name={<p>{items[c].name}</p>}
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
              name={<p>総合得点</p>}
              score={<p>{total}</p>}
            />
          </TableBody>
        </Table>
      </div>
    </>
  );
}
