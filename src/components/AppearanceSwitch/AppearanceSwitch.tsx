import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useContext } from "react";
import {
  appearanceContext,
  setAppearanceContext,
} from "../AppearanceProvider/AppearanceProvider";

export default function AppearanceSwitch() {
  const appearance = useContext(appearanceContext);
  const setAppearance = useContext(setAppearanceContext);

  return (
    <IconButton
      color="gray"
      radius="full"
      variant="surface"
      onClick={() => {
        const newAppearance = appearance === "light" ? "dark" : "light";
        setAppearance(newAppearance);
        localStorage.setItem("appearance", newAppearance);
      }}
    >
      {appearance === "dark" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
}
