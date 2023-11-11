import { rules } from "@/const/rules";
import { db } from "@/libs/db";
import { useState } from "react";

export const useRuleSelect = () => {
  const defaultRule = rules[0].id;
  const [rule, setRule] = useState<string>(defaultRule);

  const saveRule = async (value: string) => {
    await db.rule.clear();
    try {
      await db.rule.add({ rule: value });
    } catch (error) {
      throw new Error(`failed to save rule: ${error}`);
    }
  };

  return { saveRule, rule, setRule };
};
