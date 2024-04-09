"use client";

import { Theme } from "@radix-ui/themes";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { getLocalStorageAppearance } from "../../libs/localStorageAppearance";

type Props = {
  children: React.ReactNode;
};

export const appearanceContext = createContext<Appearance>("light");
export const setAppearanceContext = createContext<
  Dispatch<SetStateAction<Appearance>>
>(() => undefined);

export default function AppearanceProvider({ children }: Props) {
  const [appearance, setAppearance] = useState<Appearance>("light");

  useEffect(() => {
    const appearanceStored = getLocalStorageAppearance();
    if (appearanceStored !== null)
      setAppearance(appearanceStored as Appearance);
  }, []);

  return (
    <appearanceContext.Provider value={appearance}>
      <setAppearanceContext.Provider value={setAppearance}>
        <Theme appearance={appearance}>{children}</Theme>
      </setAppearanceContext.Provider>
    </appearanceContext.Provider>
  );
}
