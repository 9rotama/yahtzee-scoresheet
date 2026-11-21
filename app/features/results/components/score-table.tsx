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

// 固定列の右の区切り線を border-l（隣のセル側）で引くと、横スクロールで固定列の下に隠れて消えるため、固定列自身に影で描く
const stickyCell =
  "sticky left-0 z-10 shadow-[inset_-1px_0_0_var(--color-border)]";

// bg-muted/30 は半透明で、固定列に使うと横スクロール時に下のセルが透ける。固定列だけ bg-muted にすると行の他のセルと色がずれるため、背景色と混ぜた不透明色を行と固定列の両方に使う
const autoRowBg =
  "bg-[color-mix(in_oklab,var(--color-muted)_30%,var(--color-background))]";

// TableRow 既定の hover 色に任せると、行だけ色が変わって固定列と食い違うため、hover でも同じ色に固定する
const rowBgClass = {
  default: "bg-background hover:bg-background",
  auto: `${autoRowBg} hover:bg-[color-mix(in_oklab,var(--color-muted)_30%,var(--color-background))]`,
} as const;

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
            <TableHead
              scope="col"
              className={cn(stickyCell, "bg-background min-w-28 px-3")}
            >
              役
            </TableHead>
            {columns.map(({ player }, i) => (
              <TableHead
                key={player.id}
                scope="col"
                title={player.name}
                className={cn("text-center min-w-20", i > 0 && "border-l")}
              >
                <span className="block max-w-24 mx-auto truncate">
                  {player.name}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.flatMap((group, groupIdx) =>
            group.map((row, rowIdx) => {
              const isAuto = row.variant !== "default";
              return (
                <TableRow
                  key={row.label}
                  className={cn(
                    "h-9",
                    groupIdx > 0 && rowIdx === 0 && "border-t-4 border-t-muted",
                    isAuto ? rowBgClass.auto : rowBgClass.default,
                  )}
                >
                  <TableHead
                    scope="row"
                    className={cn(
                      stickyCell,
                      isAuto ? autoRowBg : "bg-background",
                      "h-auto px-3",
                      row.variant === "total" ? "font-bold" : "font-normal",
                    )}
                  >
                    {row.label}
                  </TableHead>
                  {row.values.map((value, i) => (
                    <TableCell
                      key={columns[i].player.id}
                      className={cn(
                        "text-center",
                        i > 0 && "border-l",
                        row.variant === "total" && "font-bold text-base",
                      )}
                    >
                      {value ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              );
            }),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
