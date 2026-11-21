import {
  type ScoreItemKey,
  ScoreItemLabel,
} from "~/components/score-item-label";
import { TableCell, TableHead, TableRow } from "~/components/ui/table";
import { cn } from "~/lib/utils";

type Props = {
  variant?: "default" | "auto";
  item: ScoreItemKey;
  name: string;
  score: React.ReactNode;
};

export function SheetRow({ variant = "default", item, name, score }: Props) {
  return (
    <TableRow
      className={cn(
        "h-10 hover:bg-transparent",
        variant === "auto" && "bg-muted/30 hover:bg-muted/30",
      )}
    >
      <TableHead scope="row" className="h-auto py-2 font-normal">
        <ScoreItemLabel item={item} name={name} />
      </TableHead>
      <TableCell className="border-l text-center w-32 p-0">{score}</TableCell>
    </TableRow>
  );
}
