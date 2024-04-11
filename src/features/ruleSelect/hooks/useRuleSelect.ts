import { rules } from "@/const/rules";
import { useEffect, useState } from "react";
import { getRule, saveRule } from "../libs/indexedDbRule";

export const useRuleSelect = () => {
  const defaultRule = rules[0].id;
  const [rule, setRule] = useState<string>(defaultRule);

  useEffect(() => {
    getRule().then((data) => {
      setRule(data);
    });
    return () => {};
  }, []);

  return { saveRule, rule, setRule };
};
