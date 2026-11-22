import { useMutation } from "@tanstack/react-query";
import { Check, CircleX } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";
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
import { addPreviousSheet, getCurrentSheet } from "~/lib/db.client";
import { clearCurrentScores } from "../req/index.client";

type Content = {
  title: string;
  description: string;
  trigger: React.ReactNode;
  ok: string;
};

export function CompleteDialog({ isComplete }: { isComplete: boolean }) {
  const navigate = useNavigate();
  // isPending だけでは防げない。TanStack Query は状態通知を setTimeout で遅延させるため、
  // 再描画でボタンが無効化される前に2回目のタップが届きうる
  const submittingRef = useRef(false);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (isComplete: boolean) => {
      if (!isComplete) {
        await clearCurrentScores();
        return "/settings/players";
      }
      const sheet = await getCurrentSheet();
      const id = await addPreviousSheet(sheet);
      await clearCurrentScores();
      return `/results/${id}`;
    },
    onSuccess: (to) => navigate(to),
    // 成功時には解除しない。遷移は次のルートの clientLoader を待つので、
    // 保存が終わってからダイアログが消えるまでの間にも押せてしまう
    onError: () => {
      submittingRef.current = false;
    },
  });

  const handleSubmit = () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    mutate(isComplete);
  };

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
            <Button
              className="font-bold"
              onClick={handleSubmit}
              disabled={isPending || isSuccess}
            >
              {content.ok}
            </Button>
          </DrawerFooter>
        </Width>
      </DrawerContent>
    </Drawer>
  );
}
