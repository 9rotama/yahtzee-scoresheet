import img from "~/assets/goal.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import type { Route } from "./+types/results";
import { calcYahtzee, calcYams } from "~/features/playing/utils/calc";
import type {
  ScoresYahtzee,
  ScoresYams,
} from "~/features/playing/utils/score-selects";
import { getPreviousSheet } from "~/lib/db.client";
import { cn } from "~/lib/utils";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { players, rule, scores } = await getPreviousSheet(params.id);

  // 合計点数を計算
  let results: { score: number; playerName: string }[] = [];
  if (rule.name === "yams") {
    results = (scores as ScoresYams[]).map((score) => {
      const { total } = calcYams(score);
      const playerName = players.find((p) => p.id === score.playerId)?.name;
      return { score: total, playerName: playerName || "" };
    });
  } else if (rule.name === "yahtzee") {
    results = (scores as ScoresYahtzee[]).map((score) => {
      const { total } = calcYahtzee(score);
      const playerName = players.find((p) => p.id === score.playerId)?.name;

      return { score: total, playerName: playerName || "" };
    });
  } else {
    throw new Error("Invalid rule");
  }

  const sorted = results.sort((a, b) => b.score - a.score);

  return { rule, sorted: [...sorted, ...sorted, ...sorted, ...sorted] };
}

export function HydrateFallback() {
  return null;
}

function Rank({ rank }: { rank: number }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center size-6 rounded-full",
        rank === 1 && "bg-yellow-400/50",
        rank === 2 && "bg-gray-400/50",
        rank === 3 && "bg-amber-600/50",
        rank > 3 && "bg-transparent",
      )}
    >
      <span className={cn("text-sm", rank <= 3 && "font-bold")}>{rank}</span>
    </div>
  );
}

export default function Results({ loaderData }: Route.ComponentProps) {
  const { rule, sorted } = loaderData;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <img src={img} alt="players" width={370} height={320} />

      <h1 className="text-lg font-bold text-center mt-4">結果発表</h1>
      <div className="text-xs mt-2">
        <span className="bg-muted rounded-md py-1 px-2 mr-2">ルール</span>
        {rule.name === "yahtzee" && "ヤッツィー"}
        {rule.name === "yams" && "ヤムス"}
      </div>
      <div className="mt-4 max-w-[320px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">順位</TableHead>
              <TableHead>プレイヤー</TableHead>
              <TableHead>スコア</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((result, i) => (
              <TableRow key={result.playerName}>
                <TableCell>
                  <Rank rank={i + 1} />
                </TableCell>
                <TableCell>{result.playerName}</TableCell>
                <TableCell>
                  <span className="font-bold text-xl">{result.score}</span> 点
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
