import { Table, TableBody } from "~/components/ui/table";
import { SheetRow } from "./sheet-row";
import { SheetSelect } from "./sheet-select";
import {
  memo,
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  minBonusYahtzee,
  scoreSelectionsYahtzee,
  type ScoresYahtzee,
} from "../utils/score-selects";
import type { Player } from "~/features/settings/models";
import { useMutation } from "@tanstack/react-query";
import { updateCurrentScoresYahtzee } from "../req/index.client";
import type { YahtzeeCategories } from "../utils/categories";
import { setIsCompleteContext } from "~/routes/(playing)/layout";
import { checkComplete } from "../utils/check-complete";
import { items } from "../utils/yahtzee-items";

const scoreSelectionsInit: ScoresYahtzee = {
  aces: 0,
  twos: 0,
  threes: 0,
  fours: 0,
  fives: 0,
  sixes: 0,
  "three-dice": 0,
  "four-dice": 0,
  "full-house": 0,
  "s-straight": 0,
  "l-straight": 0,
  chance: 0,
  yahtzee: 0,
} as const;

const firstGroup: YahtzeeCategories[] = [
  "aces",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
] as const;

const secondGroup: YahtzeeCategories[] = ["chance"] as const;

const thirdGroup: YahtzeeCategories[] = [
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
  initialScores: ScoresYahtzee[] | undefined;
};

export function YahtzeeSheet({
  players,
  currentPlayerIdx,
  initialScores,
}: Props) {
  const [scores, setScores] = useState<ScoresYahtzee[]>(
    initialScores || players.map(() => scoreSelectionsInit),
  );
  const currentPlayerScores = scores[currentPlayerIdx];
  const setIsComplete = useContext(setIsCompleteContext);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateCurrentScoresYahtzee(scores);
    },
  });

  const handleSelect = useCallback(
    (category: YahtzeeCategories, idx: number) => {
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
  useEffect(() => {
    setIsComplete(checkComplete(scores));
  }, [scores, setIsComplete]);

  const smallTotal = firstGroup.reduce((acc, c) => {
    const idx = currentPlayerScores[c];
    return acc + (items[c].selections[idx] || 0);
  }, 0);

  const bonus = smallTotal >= minBonusYahtzee ? 35 : 0;

  const total =
    smallTotal +
    bonus +
    secondGroup.reduce((acc, c) => {
      const idx = currentPlayerScores[c];
      if (idx === undefined) return acc;
      return acc + (items[c].selections[idx] || 0);
    }, 0) +
    thirdGroup.reduce((acc, c) => {
      const idx = currentPlayerScores[c];
      if (idx === undefined) return acc;
      return acc + (items[c].selections[idx] || 0);
    }, 0);

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
