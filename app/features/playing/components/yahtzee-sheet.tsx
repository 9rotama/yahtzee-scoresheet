import { Table, TableBody } from "~/components/ui/table";
import { SheetRow } from "./sheet-row";
import { SheetSelect } from "./sheet-select";
import { memo, use, useCallback, useMemo, useState } from "react";
import {
  minBonusYahtzee,
  scoreSelectionsYahtzee,
  type ScoresYahtzee,
} from "../utils/score-selects";
import type { Player } from "~/features/settings/models";
import { useMutation } from "@tanstack/react-query";
import { updateCurrentScoresYahtzee } from "../req/index.client";

const items = {
  aces: { name: "エース", selections: scoreSelectionsYahtzee.aces },
  twos: { name: "デュース", selections: scoreSelectionsYahtzee.twos },
  threes: { name: "トレイ", selections: scoreSelectionsYahtzee.threes },
  fours: { name: "フォー", selections: scoreSelectionsYahtzee.fours },
  fives: { name: "ファイブ", selections: scoreSelectionsYahtzee.fives },
  sixes: { name: "シックス", selections: scoreSelectionsYahtzee.sixes },
  chance: { name: "チャンス", selections: scoreSelectionsYahtzee.chance },
  "three-dice": {
    name: "スリーダイス",
    selections: scoreSelectionsYahtzee["three-dice"],
  },
  "four-dice": {
    name: "フォーダイス",
    selections: scoreSelectionsYahtzee["four-dice"],
  },
  "full-house": {
    name: "フルハウス",
    selections: scoreSelectionsYahtzee["full-house"],
  },
  "s-straight": {
    name: "S・ストレート",
    selections: scoreSelectionsYahtzee["s-straight"],
  },
  "l-straight": {
    name: "L・ストレート",
    selections: scoreSelectionsYahtzee["l-straight"],
  },
  yahtzee: { name: "ヤッツィー", selections: scoreSelectionsYahtzee.yahtzee },
} as const;

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
