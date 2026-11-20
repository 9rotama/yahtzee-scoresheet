import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import img from "~/assets/goal.png";
import { Button } from "~/components/ui/button";
import { RankingTable } from "~/features/results/components/ranking-table";
import { RuleBadge } from "~/features/results/components/rule-badge";
import { ScoreTable } from "~/features/results/components/score-table";
import { rankPlayers } from "~/features/results/utils/ranking";
import { getPreviousSheet } from "~/lib/db.client";
import type { Route } from "./+types/results";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const sheet = await getPreviousSheet(params.id);
  return { sheet, ranking: rankPlayers(sheet) };
}

export function HydrateFallback() {
  return null;
}

export default function Results({ loaderData }: Route.ComponentProps) {
  const { sheet, ranking } = loaderData;

  return (
    <div className="flex flex-col items-center">
      <img src={img} alt="players" width={370} height={320} />

      <h1 className="text-lg font-bold text-center mt-4">結果発表</h1>
      <RuleBadge rule={sheet.rule} className="mt-2" />
      <div className="mt-4 w-full max-w-[320px]">
        <RankingTable results={ranking} />
      </div>
      <h2 className="self-start text-base font-bold mt-8 mb-2">得点表</h2>
      <div className="w-full">
        <ScoreTable
          players={sheet.players}
          rule={sheet.rule}
          scores={sheet.scores}
        />
      </div>
      <div className="w-full mt-16">
        <Button
          variant="default"
          className="w-full h-12 font-bold rounded-full"
          asChild
        >
          <Link to="/game">
            同じ設定でもう一回遊ぶ
            <ArrowRight />
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="mt-2 w-full h-12 font-bold rounded-full"
          asChild
        >
          <Link to="/settings/players">
            <ArrowLeft />
            設定画面に戻る
          </Link>
        </Button>
      </div>
    </div>
  );
}
