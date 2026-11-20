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
  const [winner, ...others] = ranking;

  return (
    <Link
      to={`/histories/${id}`}
      className="block border rounded-md py-3 px-3 transition-colors hover:bg-muted/50"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {formatPlayedAt(date)}
        </span>
        <span className="text-xs bg-muted rounded-md py-0.5 px-2">
          {ruleLabels[rule.name]}
        </span>
      </div>
      {winner && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 min-w-0">
            <Crown
              aria-label="1位"
              className="size-5 shrink-0 text-yellow-500 fill-yellow-500"
            />
            <span className="text-sm font-bold truncate">
              {winner.playerName}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="font-bold text-xl">{winner.score}</span>
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
