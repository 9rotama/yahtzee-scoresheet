export function makeZeroOrPositive(num: number) {
  if (num < 0) {
    return 0;
  } else {
    return num;
  }
}
