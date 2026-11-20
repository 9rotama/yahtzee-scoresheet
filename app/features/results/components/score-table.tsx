import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { calcYahtzee, calcYams } from "~/features/playing/utils/calc";
import type {
  YahtzeeCategories,
  YamsCategories,
} from "~/features/playing/utils/categories";
import type {
  ScoresYahtzee,
  ScoresYams,
} from "~/features/playing/utils/score-selects";
import { yahtzeeItems } from "~/features/playing/utils/yahtzee-items";
import { yamsItems } from "~/features/playing/utils/yams-items";
import type { Player } from "~/features/settings/models";
import { cn } from "~/lib/utils";
import type { PreviousSheet } from "~/models/sheet";

type Cell = number | undefined;
type Row = {
  label: string;
  variant: "default" | "auto" | "total";
  values: Cell[];
};
type Group = Row[];
type Column<S> = { player: Player; scores: S };

function toColumns<S extends { playerId: string }>(
  players: Player[],
  scores: S[],
): Column<S>[] {
  return players.flatMap((player) => {
    const s = scores.find((score) => score.playerId === player.id);
    return s ? [{ player, scores: s }] : [];
  });
}

function buildYahtzeeGroups(columns: Column<ScoresYahtzee>[]): Group[] {
  const calcs = columns.map((c) => calcYahtzee(c.scores));
  const category = (c: YahtzeeCategories): Row => ({
    label: yahtzeeItems[c].name,
    variant: "default",
    values: columns.map((col) => yahtzeeItems[c].selections[col.scores[c]]),
  });
  return [
    [
      ...(["aces", "twos", "threes", "fours", "fives", "sixes"] as const).map(
        category,
      ),
      {
        label: "小計",
        variant: "auto",
        values: calcs.map((r) => r.smallTotal),
      },
      { label: "ボーナス", variant: "auto", values: calcs.map((r) => r.bonus) },
    ],
    [category("chance")],
    (
      [
        "three-dice",
        "four-dice",
        "full-house",
        "s-straight",
        "l-straight",
        "yahtzee",
      ] as const
    ).map(category),
    [
      {
        label: "総合得点",
        variant: "total",
        values: calcs.map((r) => r.total),
      },
    ],
  ];
}

function buildYamsGroups(columns: Column<ScoresYams>[]): Group[] {
  const calcs = columns.map((c) => calcYams(c.scores));
  const category = (c: YamsCategories): Row => ({
    label: yamsItems[c].name,
    variant: "default",
    values: columns.map((col) => yamsItems[c].selections[col.scores[c]]),
  });
  return [
    [
      ...(["aces", "twos", "threes", "fours", "fives", "sixes"] as const).map(
        category,
      ),
      {
        label: "小計",
        variant: "auto",
        values: calcs.map((r) => r.smallTotal),
      },
      { label: "ボーナス", variant: "auto", values: calcs.map((r) => r.bonus) },
    ],
    [
      category("plus"),
      category("minus"),
      { label: "デルタ", variant: "auto", values: calcs.map((r) => r.delta) },
    ],
    (
      [
        "four-dice",
        "full-house",
        "s-straight",
        "l-straight",
        "rigole",
        "yahtzee",
      ] as const
    ).map(category),
    [
      {
        label: "総合得点",
        variant: "total",
        values: calcs.map((r) => r.total),
      },
    ],
  ];
}

type Props = Pick<PreviousSheet, "players" | "rule" | "scores">;

export function ScoreTable({ players, rule, scores }: Props) {
  // 役ごとに枠を分けると横スクロールが枠ごとにずれるため、1つの表にまとめてグループ境界を太線で表す
  const columns =
    rule.name === "yahtzee"
      ? toColumns(players, scores as ScoresYahtzee[])
      : toColumns(players, scores as ScoresYams[]);
  const groups =
    rule.name === "yahtzee"
      ? buildYahtzeeGroups(columns as Column<ScoresYahtzee>[])
      : buildYamsGroups(columns as Column<ScoresYams>[]);

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="sticky left-0 z-10 bg-background min-w-28 px-3">
              役
            </TableHead>
            {columns.map(({ player }) => (
              <TableHead
                key={player.id}
                className="border-l text-center min-w-20"
              >
                {player.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.flatMap((group, groupIdx) =>
            group.map((row, rowIdx) => (
              <TableRow
                key={row.label}
                className={cn(
                  "h-9 hover:bg-transparent",
                  groupIdx > 0 && rowIdx === 0 && "border-t-4 border-t-muted",
                  row.variant !== "default" && "bg-muted/30",
                )}
              >
                <TableCell
                  className={cn(
                    "sticky left-0 z-10 px-3",
                    // 半透明の bg-muted/30 だと横スクロール時に下のセルが透けるため、固定列は不透明色にする
                    row.variant === "default" ? "bg-background" : "bg-muted",
                    row.variant === "total" && "font-bold",
                  )}
                >
                  {row.label}
                </TableCell>
                {row.values.map((value, i) => (
                  <TableCell
                    key={columns[i].player.id}
                    className={cn(
                      "border-l text-center",
                      row.variant === "total" && "font-bold text-base",
                    )}
                  >
                    {value ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
