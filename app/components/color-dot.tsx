import clsx from "clsx";
import { cn } from "~/lib/utils";

export function ColorDot({
  color,
  size,
}: {
  color: `bg-${string}`;
  size: `size-${string}`;
}) {
  return <div className={cn("rounded-full", color, size)} />;
}
