import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { ModeToggle } from "~/components/mode-toggle";
import { Width } from "~/components/width";
import { CompleteDialog } from "~/features/playing/components/complete-dialog";
import {
  isCompleteContext,
  setIsCompleteContext,
} from "~/features/playing/contexts/is-complete";

export default function PlayingLayout() {
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
