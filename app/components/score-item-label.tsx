import scoreIcons from "~/assets/score-icons.svg?no-inline";
import type {
  YahtzeeCategories,
  YamsCategories,
} from "~/features/playing/utils/categories";
import { cn } from "~/lib/utils";

export type ScoreItemKey =
  | YahtzeeCategories
  | YamsCategories
  | "subtotal"
  | "bonus"
  | "delta"
  | "total";

type Props = {
  item: ScoreItemKey;
  name: string;
  compact?: boolean;
};

export function ScoreItemLabel({ item, name, compact = false }: Props) {
  return (
    <span className={cn("flex items-center", compact ? "gap-1" : "gap-1.5")}>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("shrink-0", compact ? "size-4.5" : "size-5")}
      >
        <use href={`${scoreIcons}#${item}`} />
      </svg>
      <span className="min-w-0 whitespace-normal">{name}</span>
    </span>
  );
}
