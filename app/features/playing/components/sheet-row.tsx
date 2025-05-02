import { TableCell, TableRow } from "~/components/ui/table";
import { cn } from "~/lib/utils";

type Props = {
  variant?: "default" | "auto";
  icon?: React.ReactNode;
  name: React.ReactNode;
  score: React.ReactNode;
};

export function SheetRow({ variant = "default", icon, name, score }: Props) {
  return (
    <TableRow
      className={cn(
        "h-10 hover:bg-transparent",
        variant === "auto" && "bg-muted/30 hover:bg-muted/30",
      )}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          {icon}
          {name}
        </div>
      </TableCell>
      <TableCell className="border-l text-center w-32 p-0">{score}</TableCell>
    </TableRow>
  );
}
