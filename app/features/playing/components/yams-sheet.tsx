import { Table, TableBody } from "~/components/ui/table";
import { SheetRow } from "./sheet-row";
import { SheetSelect } from "./sheet-select";
import { useCallback, useState } from "react";
import {
  minBonusYams,
  scoreSelectionsYams,
  type ScoresYams,
} from "../utils/score-selects";
import type { Player } from "~/features/settings/models";
import { useMutation } from "@tanstack/react-query";
import { updateCurrentScoresYams } from "../req/index.client";

const items: {
  [key in YamsCategories]: {
    name: string;
    selections: (number | undefined)[];
  };
} = {
  aces: { name: "エース", selections: scoreSelectionsYams.aces },
  twos: { name: "デュース", selections: scoreSelectionsYams.twos },
  threes: { name: "トレイ", selections: scoreSelectionsYams.threes },
  fours: { name: "フォー", selections: scoreSelectionsYams.fours },
  fives: { name: "ファイブ", selections: scoreSelectionsYams.fives },
  sixes: { name: "シックス", selections: scoreSelectionsYams.sixes },
  plus: { name: "プラス", selections: scoreSelectionsYams.plus },
  minus: { name: "マイナス", selections: scoreSelectionsYams.minus },
  rigole: { name: "リゴール", selections: scoreSelectionsYams.rigole },
  "four-dice": {
    name: "フォーダイス",
    selections: scoreSelectionsYams["four-dice"],
  },
  "full-house": {
    name: "フルハウス",
    selections: scoreSelectionsYams["full-house"],
  },
  "s-straight": {
    name: "S・ストレート",
    selections: scoreSelectionsYams["s-straight"],
  },
  "l-straight": {
    name: "L・ストレート",
    selections: scoreSelectionsYams["l-straight"],
  },
  yahtzee: { name: "ヤッツィー", selections: scoreSelectionsYams.yahtzee },
} as const;

const scoreSelectedIdxInit: ScoresYams = {
  aces: 0,
  twos: 0,
  threes: 0,
  fours: 0,
  fives: 0,
  sixes: 0,
  "four-dice": 0,
  "full-house": 0,
  "s-straight": 0,
  "l-straight": 0,
  plus: 0,
  minus: 0,
  rigole: 0,
  yahtzee: 0,
} as const;

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
  initialScores: ScoresYams[] | undefined;
};

export function YamsSheet({ players, currentPlayerIdx, initialScores }: Props) {
  const [scores, setScores] = useState<ScoresYams[]>(
    initialScores || players.map(() => scoreSelectedIdxInit),
  );
  const currentPlayerScores = scores[currentPlayerIdx];

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateCurrentScoresYams(scores);
    },
  });

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

  const smallTotal = firstGroup.reduce((acc, c) => {
    const idx = currentPlayerScores[c];
    return acc + (items[c].selections[idx] || 0);
  }, 0);
  const plus = items.plus.selections[currentPlayerScores.plus];
  const minus = items.plus.selections[currentPlayerScores.minus];

  const delta =
    plus !== undefined && minus !== undefined
      ? Math.max(plus - minus, 0)
      : undefined;

  const bonus = smallTotal >= minBonusYams ? 35 : 0;

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
