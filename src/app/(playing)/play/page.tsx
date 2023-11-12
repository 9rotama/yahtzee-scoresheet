import styles from "./page.module.css";

type Props = {
  children: React.ReactNode;
};

export default function PlayPage({ children }: Props) {
  return <div className={styles.module}>{children}</div>;
}
