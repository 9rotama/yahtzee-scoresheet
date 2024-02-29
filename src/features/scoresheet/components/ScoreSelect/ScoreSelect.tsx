import { Select } from "@radix-ui/themes";
import styles from "./ScoreSelect.module.css";

type ScoreSelectProps =
  | {
      rule: "yahtzee";
      category: YahtzeeCategories;
      selects: string[];
      value: string;
      setValue: (category: YahtzeeCategories, newValue: string) => void;
    }
  | {
      rule: "yams";
      category: YamsCategories;
      selects: string[];
      value: string;
      setValue: (category: YamsCategories, newValue: string) => void;
    };

export default function ScoreSelect({
  rule,
  category,
  selects,
  value,
  setValue,
}: ScoreSelectProps) {
  return (
    <Select.Root
      size="3"
      defaultValue="none"
      value={value}
      onValueChange={(newValue) => {
        rule === "yahtzee"
          ? setValue(category, newValue)
          : setValue(category, newValue);
      }}
    >
      <Select.Trigger
        m="0"
        variant="ghost"
        color="jade"
        className={styles.scoreSelectTrigger}
      />
      <Select.Content color="jade">
        <Select.Item key={`${category}-none`} value="none">
          -
        </Select.Item>
        {selects.map((select) => (
          <Select.Item key={`${category}-${select}`} value={select}>
            {select}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
