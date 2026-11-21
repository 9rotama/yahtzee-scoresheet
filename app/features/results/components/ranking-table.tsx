import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import type { RankedResult } from "../utils/ranking";

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

export function RankingTable({ results }: { results: RankedResult[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">順位</TableHead>
          <TableHead>プレイヤー</TableHead>
          <TableHead className="text-right">スコア</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.playerId}>
            <TableCell>
              <Rank rank={result.rank} />
            </TableCell>
            <TableCell title={result.playerName}>
              <span className="block max-w-36 truncate">
                {result.playerName}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <span className="font-bold text-xl">{result.score}</span> 点
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
