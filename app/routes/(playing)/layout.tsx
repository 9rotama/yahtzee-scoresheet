import { Check, CircleX } from "lucide-react";
import { createContext, useContext, useState, type Dispatch } from "react";
import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { ModeToggle } from "~/components/mode-toggle";
import { ThemeProvider } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";
import { Width } from "~/components/width";
import { CompleteDialog } from "~/features/playing/components/complete-dialog";

export const isCompleteContext = createContext<boolean>(false);
export const setIsCompleteContext = createContext<
  Dispatch<React.SetStateAction<boolean>>
>(() => {});

export default function IdleLayout() {
  const [isComplete, setIsComplete] = useState(false);
  return (
    <>
      <Header>
        <CompleteDialog isComplete={isComplete} />

        <ModeToggle />
      </Header>
      <Width>
        <div className="pt-12 pb-16">
          <isCompleteContext.Provider value={isComplete}>
            <setIsCompleteContext.Provider value={setIsComplete}>
              <Outlet />
            </setIsCompleteContext.Provider>
          </isCompleteContext.Provider>
        </div>
      </Width>
    </>
  );
}
