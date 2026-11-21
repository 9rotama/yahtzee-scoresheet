import { Edit2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Width } from "~/components/width";
import type { Player } from "../models";

type Props = {
  player: Player;
  onSubmit: (data: Player) => void;
};

const nameId = "player-name";

export function PlayerEdit({ player, onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(player.name);

  const disabled = name === player.name || name.length === 0;

  const handleSubmit = () => {
    onSubmit({ id: player.id, name });
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <Edit2 />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pb-8">
        <Width>
          <DrawerHeader className="flex items-center gap-2">
            <DrawerTitle>プレイヤーを編集</DrawerTitle>
            <DrawerDescription>プレイヤー名を変更できます。</DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor={nameId}>名前</Label>
              <Input
                id={nameId}
                defaultValue={player.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Button className="w-full mt-8" type="submit" disabled={disabled}>
              変更
            </Button>
          </form>
        </Width>
      </DrawerContent>
    </Drawer>
  );
}
