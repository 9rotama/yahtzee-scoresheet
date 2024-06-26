import { Select } from "@radix-ui/themes";
import styles from "./ScoreSelect.module.css";

type ScoreSelectProps = {
  selects: string[];
  value: string;
  setValue: (newValue: string) => void;
};

export default function ScoreSelect({
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
        setValue(newValue);
      }}
    >
      <Select.Trigger
        m="0"
        variant="ghost"
        color="jade"
        className={styles.scoreSelectTrigger}
      />
      <Select.Content color="jade">
        <Select.Item key={`none`} value="none">
          -
        </Select.Item>
        {selects.map((select) => (
          <Select.Item key={`${select}`} value={select}>
            {select}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
