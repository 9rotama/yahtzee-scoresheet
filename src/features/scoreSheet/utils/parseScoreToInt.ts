export function parseScoreToInt(score: string) {
  if (score === "none") return 0;
  return parseInt(score);
}
