import type { YamsCategories } from "./categories";
import { scoreSelectionsYams } from "./score-selects";

export const items: {
  [key in YamsCategories]: {
    name: string;
    selections: (number | undefined)[];
  };
} = {
  aces: { name: "エース", selections: scoreSelectionsYams.aces },
  twos: { name: "デュース", selections: scoreSelectionsYams.twos },
  threes: { name: "トレイ", selections: scoreSelectionsYams.threes },
  fours: { name: "フォー", selections: scoreSelectionsYams.fours },
  fives: { name: "ファイブ", selections: scoreSelectionsYams.fives },
  sixes: { name: "シックス", selections: scoreSelectionsYams.sixes },
  plus: { name: "プラス", selections: scoreSelectionsYams.plus },
  minus: { name: "マイナス", selections: scoreSelectionsYams.minus },
  rigole: { name: "リゴール", selections: scoreSelectionsYams.rigole },
  "four-dice": {
    name: "フォーダイス",
    selections: scoreSelectionsYams["four-dice"],
  },
  "full-house": {
    name: "フルハウス",
    selections: scoreSelectionsYams["full-house"],
  },
  "s-straight": {
    name: "S・ストレート",
    selections: scoreSelectionsYams["s-straight"],
  },
  "l-straight": {
    name: "L・ストレート",
    selections: scoreSelectionsYams["l-straight"],
  },
  yahtzee: { name: "ヤッツィー", selections: scoreSelectionsYams.yahtzee },
} as const;
