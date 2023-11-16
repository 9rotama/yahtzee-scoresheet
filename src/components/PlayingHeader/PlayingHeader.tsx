import { Button } from "@radix-ui/themes";
import HeaderLayout from "../HeaderLayout";

export default function PlayingHeader() {
  return (
    <HeaderLayout
      right={
        <Button color="gray" variant="outline">
          ゲーム終了
        </Button>
      }
    />
  );
}
