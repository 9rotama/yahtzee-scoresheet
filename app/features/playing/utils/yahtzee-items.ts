import { scoreSelectionsYahtzee } from "./score-selects";

export const items = {
  aces: { name: "エース", selections: scoreSelectionsYahtzee.aces },
  twos: { name: "デュース", selections: scoreSelectionsYahtzee.twos },
  threes: { name: "トレイ", selections: scoreSelectionsYahtzee.threes },
  fours: { name: "フォー", selections: scoreSelectionsYahtzee.fours },
  fives: { name: "ファイブ", selections: scoreSelectionsYahtzee.fives },
  sixes: { name: "シックス", selections: scoreSelectionsYahtzee.sixes },
  chance: { name: "チャンス", selections: scoreSelectionsYahtzee.chance },
  "three-dice": {
    name: "スリーダイス",
    selections: scoreSelectionsYahtzee["three-dice"],
  },
  "four-dice": {
    name: "フォーダイス",
    selections: scoreSelectionsYahtzee["four-dice"],
  },
  "full-house": {
    name: "フルハウス",
    selections: scoreSelectionsYahtzee["full-house"],
  },
  "s-straight": {
    name: "S・ストレート",
    selections: scoreSelectionsYahtzee["s-straight"],
  },
  "l-straight": {
    name: "L・ストレート",
    selections: scoreSelectionsYahtzee["l-straight"],
  },
  yahtzee: { name: "ヤッツィー", selections: scoreSelectionsYahtzee.yahtzee },
} as const;
