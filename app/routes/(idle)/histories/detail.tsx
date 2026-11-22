import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, redirect, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { DeleteHistoryDialog } from "~/features/history/components/delete-history-dialog";
import { formatPlayedAt } from "~/features/history/utils/format-date";
import { RankingTable } from "~/features/results/components/ranking-table";
import { RuleBadge } from "~/features/results/components/rule-badge";
import { ScoreTable } from "~/features/results/components/score-table";
import { rankPlayers } from "~/features/results/utils/ranking";
import { deletePreviousSheet, getPreviousSheet } from "~/lib/db.client";
import type { Route } from "./+types/detail";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const sheet = await getPreviousSheet(params.id);
  // 削除後のブラウザバックやブックマークで普通に到達するため、エラー画面ではなく一覧へ戻す
  if (!sheet) throw redirect("/histories");
  return { id: params.id, sheet, ranking: rankPlayers(sheet) };
}

export function meta() {
  return [{ title: "プレー履歴 | yahtzee-scoresheet" }];
}

export function HydrateFallback() {
  return null;
}

export default function HistoryDetail({ loaderData }: Route.ComponentProps) {
  const { id, sheet, ranking } = loaderData;
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await deletePreviousSheet(id);
      navigate("/histories", { replace: true });
    },
  });

  return (
    <div className="flex flex-col">
      <div className="mt-3">
        <Button variant="ghost" size="sm" className="-ml-2" asChild>
          <Link to="/histories">
            <ArrowLeft />
            履歴一覧
          </Link>
        </Button>
      </div>
      <h1 className="text-lg font-bold text-center mt-2">
        {formatPlayedAt(sheet.date)}
      </h1>
      <RuleBadge rule={sheet.rule} className="mt-2 text-center" />
      <div className="mt-4 mx-auto w-full max-w-[320px]">
        <RankingTable results={ranking} />
      </div>
      <h2 className="text-base font-bold mt-8 mb-2">得点表</h2>
      <ScoreTable
        players={sheet.players}
        rule={sheet.rule}
        scores={sheet.scores}
      />
      <div className="mt-12">
        <DeleteHistoryDialog onDelete={() => mutate()} isDeleting={isPending} />
      </div>
    </div>
  );
}
