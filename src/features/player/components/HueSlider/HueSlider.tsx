import { RefAttributes, forwardRef } from "react";
import styles from "./HueSlider.module.css";
import * as Slider from "@radix-ui/react-slider";

type Props = Slider.SliderProps & RefAttributes<HTMLSpanElement>;

export const HueSlider = forwardRef<HTMLSpanElement, Props>(
  function CustomSlider(props, forwardedRef) {
    return (
      <Slider.Root
        className={styles.root}
        defaultValue={[50]}
        max={360}
        step={1}
        ref={forwardedRef}
        {...props}
      >
        <Slider.Track className={styles.track} />
        <Slider.Thumb className={styles.thumb} aria-label="Hue" />
      </Slider.Root>
    );
  },
);

export default HueSlider;
