import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

type Props = {
  slot: React.ReactNode;
};

export default function CellValueAutoUpdated({ slot }: Props) {
  const opacity = useMotionValue(0.5);

  useEffect(() => {
    opacity.set(0.5);

    const opacityAnimation = animate(opacity, 1, { duration: 0.3 });

    opacityAnimation.play();
  }, [slot]);

  return <motion.div style={{ opacity }}>{slot}</motion.div>;
}
