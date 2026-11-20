import { Trash2 } from "lucide-react";
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

export function DeleteHistoryDialog({
  onDelete,
  isDeleting,
}: {
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-12 font-bold rounded-full text-destructive hover:text-destructive"
        >
          <Trash2 />
          この履歴を削除
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Width>
          <DrawerHeader>
            <DrawerTitle>履歴を削除</DrawerTitle>
            <DrawerDescription>
              この履歴を削除しますか?
              <br />
              削除すると元に戻せません。
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">キャンセル</Button>
            </DrawerClose>
            <Button
              variant="destructive"
              className="font-bold"
              disabled={isDeleting}
              onClick={onDelete}
            >
              削除する
            </Button>
          </DrawerFooter>
        </Width>
      </DrawerContent>
    </Drawer>
  );
}
