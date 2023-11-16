import styles from "./PlayerColorDot.module.css";

type Props = {
  colorHue: number;
  size: number;
};

export default function PlayerColorDot({ colorHue, size }: Props) {
  return (
    <span
      className={styles.module}
      style={{
        backgroundColor: `hsl(${colorHue}deg 100% 50%)`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
