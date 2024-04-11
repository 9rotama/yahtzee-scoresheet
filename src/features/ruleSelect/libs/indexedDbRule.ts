import { db } from "@/libs/db";

export async function getRule() {
  return db.rule
    .toArray()
    .then((data) => (data.length === 0 ? "yahtzee" : data[0].rule));
}

export async function saveRule(value: string) {
  await db.rule.clear();
  try {
    await db.rule.add({ rule: value });
  } catch (error) {
    throw new Error(`failed to save rule: ${error}`);
  }
}
