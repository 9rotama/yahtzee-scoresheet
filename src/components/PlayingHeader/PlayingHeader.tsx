import { Button } from "@radix-ui/themes";
import HeaderLayout from "../HeaderLayout";

type PlayingHeaderProps = {
  onClickFinishButton: () => void;
};

export default function PlayingHeader({
  onClickFinishButton,
}: PlayingHeaderProps) {
  return (
    <HeaderLayout
      right={
        <Button color="gray" variant="outline" onClick={onClickFinishButton}>
          ゲーム終了
        </Button>
      }
    />
  );
}
