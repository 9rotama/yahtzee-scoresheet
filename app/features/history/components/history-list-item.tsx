import { ChevronRight, Crown } from "lucide-react";
import { Link } from "react-router";
import { ruleLabels } from "~/features/results/components/rule-badge";
import type { RankedResult } from "~/features/results/utils/ranking";
import type { Rule } from "~/features/settings/models";
import { formatPlayedAt } from "../utils/format-date";

type Props = {
  id: string;
  date: number;
  rule: Rule;
  ranking: RankedResult[];
};

export function HistoryListItem({ id, date, rule, ranking }: Props) {
  // 同点1位は全員を王冠の行に出す。先頭だけを1位扱いにすると、同点の人が「その他」に紛れる
  const winners = ranking.filter((r) => r.rank === 1);
  const others = ranking.filter((r) => r.rank !== 1);

  return (
    <Link
      to={`/histories/${id}`}
      className="block border rounded-md p-3 transition-colors hover:bg-muted/50 active:bg-muted/50"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {formatPlayedAt(date)}
        </span>
        <span className="text-xs bg-muted rounded-md py-0.5 px-2">
          {ruleLabels[rule.name]}
        </span>
      </div>
      {winners.length > 0 && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 min-w-0">
            <Crown
              aria-label="1位"
              className="size-5 shrink-0 text-yellow-500 fill-yellow-500"
            />
            <span className="text-sm font-bold truncate">
              {winners.map((r) => r.playerName).join("・")}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="font-bold text-xl">{winners[0].score}</span>
            <span className="text-sm">点</span>
            <ChevronRight className="size-4 text-muted-foreground ml-1" />
          </div>
        </div>
      )}
      {others.length > 0 && (
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {others.map((r) => `${r.playerName} ${r.score}`).join(" ・ ")}
        </p>
      )}
    </Link>
  );
}
