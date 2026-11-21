import { Menu } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Header } from "~/components/header";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "~/components/ui/drawer";
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
                {/* Drawer はレイアウトに常駐していて遷移では閉じないため、Link 単体ではなく DrawerClose で包む */}
                <DrawerClose asChild>
                  <Button variant="ghost" asChild>
                    <Link to="/histories">プレー履歴</Link>
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="ghost" asChild>
                    <Link to="/credits">クレジット</Link>
                  </Button>
                </DrawerClose>
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
