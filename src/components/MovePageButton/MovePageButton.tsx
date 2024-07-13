import { Button, buttonPropDefs } from "@radix-ui/themes";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import styles from "./MovePageButton.module.css";
import { ComponentProps, HTMLAttributes } from "react";

type ButtonColor = (typeof buttonPropDefs.color.values)[number];
type ButtonVariant = (typeof buttonPropDefs.variant.values)[number];

type Props = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  direction: "none" | "next" | "prev";
  children: React.ReactNode;
} & ComponentProps<typeof Button>;

export default function MovePageButton({
  variant = "solid",
  color = "jade",
  direction,
  children,
  ...props
}: Props) {
  switch (direction) {
    case "none":
      return (
        <Button
          size="4"
          variant={variant}
          color={color}
          radius="full"
          className={styles.button}
          {...props}
        >
          {children}
        </Button>
      );
    case "next":
      return (
        <Button
          size="4"
          variant={variant}
          color={color}
          radius="full"
          className={styles.button}
          {...props}
        >
          {children}
          <div className={styles.arrowLayer}>
            <div className={styles.nextArrow}>
              <FiArrowRight size={20} />
            </div>
          </div>
        </Button>
      );
    case "prev":
      return (
        <Button
          size="4"
          variant={variant}
          color={color}
          radius="full"
          className={styles.button}
          {...props}
        >
          {children}
          <div className={styles.arrowLayer}>
            <div className={styles.prevArrow}>
              <FiArrowLeft size={20} />
            </div>
          </div>
        </Button>
      );
  }
}
