import { Menu } from "lucide-react";
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
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost">
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <Width>
              <div className="flex flex-col gap-1 p-3">
                <Button variant="ghost">プレー履歴</Button>
                <Button variant="ghost">クレジット</Button>
              </div>
            </Width>
          </DrawerContent>
        </Drawer>

        <div className="text-sm font-mono font-bold">yams 🎲 sheet</div>
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
