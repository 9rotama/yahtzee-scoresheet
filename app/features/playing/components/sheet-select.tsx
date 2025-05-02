import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Width } from "~/components/width";
import { Button } from "~/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";

type Props = {
  name: string;
  selectedIdx: number;
  selections: (number | undefined)[];
  onSelect: (idx: number) => void;
};

type MemoProps = {
  name: string;
  selectedIdx: number;
  selections: (number | undefined)[];
  onSelect: (idx: number) => void;
};

function SheetSelectContent({
  name,
  selectedIdx,
  selections,
  onSelect,
}: MemoProps) {
  return (
    <DrawerContent>
      <Width>
        <DrawerHeader>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription>得点を選択してください。</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col gap-1 p-3">
            {selections.map((item, i) => (
              <Button
                key={item}
                variant="ghost"
                value={item ? item.toString() : "none"}
                onClick={() => onSelect(i)}
                className={cn(
                  "relative",
                  selectedIdx === i && "bg-secondary/50 font-bold",
                )}
              >
                {item === undefined ? <p>-</p> : <p>{item}</p>}
                <Check
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2",
                    selectedIdx !== i && "hidden",
                  )}
                />
              </Button>
            ))}
          </div>
        </ScrollArea>
      </Width>
    </DrawerContent>
  );
}

const MemoSheetSelectContent = memo(SheetSelectContent);

export function SheetSelect({
  name,
  selectedIdx,
  selections,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (idx: number) => {
      onSelect(idx);
      setOpen(false);
    },
    [onSelect],
  );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="block w-full h-10 cursor-pointer relative rounded-none"
          variant="ghost"
        >
          <p>
            {selectedIdx ? (
              <p>{selections[selectedIdx]}</p>
            ) : (
              <p className="text-muted-foreground">-</p>
            )}
          </p>
          <ChevronDown className="absolute w-4 top-1/2 bottom-0 right-2 text-muted-foreground -translate-y-1/2" />
        </Button>
      </DrawerTrigger>
      <MemoSheetSelectContent
        name={name}
        selectedIdx={selectedIdx}
        selections={selections}
        onSelect={handleSelect}
      />
    </Drawer>
  );
}
