import { Check, Menu } from "lucide-react";
import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { Width } from "~/components/width";

export default function IdleLayout() {
  return (
    <>
      <Header>
        <Button variant="outline" className="h-8 font-bold">
          ゲーム終了
        </Button>

        <ModeToggle />
      </Header>
      <Width>
        <div className="pt-12 pb-16">
          <Outlet />
        </div>
      </Width>
    </>
  );
}
