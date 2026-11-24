import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import img from "~/assets/empty.png";
import { Button } from "~/components/ui/button";
import { HistoryListItem } from "~/features/history/components/history-list-item";
import { rankPlayers } from "~/features/results/utils/ranking";
import { listPreviousSheets } from "~/lib/db.client";
import type { Route } from "./+types/index";

export async function clientLoader() {
  const sheets = await listPreviousSheets();
  return sheets.map((sheet) => ({
    id: sheet.id,
    date: sheet.date,
    rule: sheet.rule,
    ranking: rankPlayers(sheet),
  }));
}

export function meta() {
  return [{ title: "プレー履歴 | yahtzee-scoresheet" }];
}

export default function Histories({ loaderData }: Route.ComponentProps) {
  if (loaderData.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold text-center mt-4">プレー履歴</h1>
        <img
          src={img}
          alt=""
          width={200}
          height={173}
          className="mt-12 w-[200px] h-auto"
        />
        <p className="text-sm text-muted-foreground mt-3">
          まだ履歴がありません
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          ゲームを終了すると、ここに結果が保存されます
        </p>
        {/* プレー中でも履歴が0件のことはあるため、設定画面に固定せず "/" の振り分けに任せる */}
        <Button
          variant="default"
          className="mt-16 w-full h-12 font-bold rounded-full"
          asChild
        >
          <Link to="/">
            ゲームをはじめる
            <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold text-center mt-4">プレー履歴</h1>
      <p className="text-xs text-muted-foreground text-center mt-1">
        全 {loaderData.length} 件
      </p>
      <div className="flex flex-col gap-2 mt-6">
        {loaderData.map((history) => (
          <HistoryListItem key={history.id} {...history} />
        ))}
      </div>
      <div className="w-full mt-16">
        {/* 戻り先はシート状態で変わるため、固定ルートではなく "/" の振り分けに任せる */}
        <Button
          variant="secondary"
          className="w-full h-12 font-bold rounded-full"
          asChild
        >
          <Link to="/">
            <ArrowLeft />
            ホームに戻る
          </Link>
        </Button>
      </div>
    </div>
  );
}
