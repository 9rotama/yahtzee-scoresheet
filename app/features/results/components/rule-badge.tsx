import type { Rule } from "~/features/settings/models";
import { cn } from "~/lib/utils";

export const ruleLabels: { [key in Rule["name"]]: string } = {
  yahtzee: "ヤッツィー",
  yams: "ヤムス",
};

export function RuleBadge({
  rule,
  className,
}: {
  rule: Rule;
  className?: string;
}) {
  return (
    <div className={cn("text-xs", className)}>
      <span className="bg-muted rounded-md py-1 px-2 mr-2">ルール</span>
      {ruleLabels[rule.name]}
    </div>
  );
}
