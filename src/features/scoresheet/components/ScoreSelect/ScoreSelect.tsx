import { Select } from "@radix-ui/themes";
import styles from "./ScoreSelect.module.css";

type ScoreSelectProps = {
  name: YahtzeeCategories | YamsCategories;
  selects: string[];
};

export default function ScoreSelect({ name, selects }: ScoreSelectProps) {
  return (
    <Select.Root size="3" defaultValue="none" onValueChange={(value) => {}}>
      <Select.Trigger
        m="0"
        variant="ghost"
        color="jade"
        className={styles.scoreSelectTrigger}
      />
      <Select.Content color="jade">
        <Select.Item key={`${name}-none`} value="none">
          -
        </Select.Item>
        {selects.map((select) => (
          <Select.Item key={`${name}-${select}`} value={select}>
            {select}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
