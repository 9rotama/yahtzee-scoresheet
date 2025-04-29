import { Check, CircleX } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Width } from "~/components/width";

type Content = {
  title: string;
  description: string;
  trigger: React.ReactNode;
  ok: string;
};

export function CompleteDialog({ isComplete }: { isComplete: boolean }) {
  const content: Content = {
    title: isComplete ? "ゲームを終了" : "ゲームを中断",
    description: isComplete
      ? "終了後は得点の編集ができません。終了しますか?"
      : "得点表に空きがあります。結果を見ずにゲームを中断しますか?",
    trigger: isComplete ? (
      <>
        <Check />
        ゲームを終了
      </>
    ) : (
      <>
        <CircleX />
        ゲームを中断
      </>
    ),
    ok: isComplete ? "終了する" : "中断する",
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-8 font-bold">
          {content.trigger}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Width>
          <DrawerHeader>
            <DrawerTitle>{content.title}</DrawerTitle>
            <DrawerDescription>{content.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">キャンセル</Button>
            </DrawerClose>
            <Button className="font-bold">{content.ok}</Button>
          </DrawerFooter>
        </Width>
      </DrawerContent>
    </Drawer>
  );
}
