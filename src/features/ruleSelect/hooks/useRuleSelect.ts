import { rules } from "@/const/rules";
import { useEffect, useState } from "react";
import { getRule } from "../libs/indexedDbRule";

export const useRuleSelect = () => {
  const defaultRule = rules[0].id;
  const [rule, setRule] = useState<string>(defaultRule);

  useEffect(() => {
    getRule().then((data) => {
      setRule(data[0].rule);
    });
    return () => {};
  }, []);

  const saveRule = async (value: string) => {
    await saveRule(value);
  };

  return { saveRule, rule, setRule };
};
