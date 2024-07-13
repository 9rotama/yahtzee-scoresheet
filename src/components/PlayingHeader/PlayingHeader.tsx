import { saveIsGameInProgress } from "@/features/scoreSheet/libs/indexedDbIsGameInProgress";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import AppearanceSwitch from "../../features/appearance/components/AppearanceSwitch";
import HeaderLayout from "../HeaderLayout";
import { useRouter } from "next/navigation";

type PlayingHeaderProps = {
  canFinishesGame: boolean;
};

export default function PlayingHeader({ canFinishesGame }: PlayingHeaderProps) {
  const router = useRouter();
  const alertContent = canFinishesGame
    ? {
        title: "ゲームを終了",
        message: "終了後は得点の編集ができません。終了しますか?",
        button: "ゲームを終了する",
        onClick: () => {
          saveIsGameInProgress("false").then(() => {
            router.replace("/results");
          });
        },
      }
    : {
        title: "ゲームを中断",
        message: "得点表に空きがあります。結果を見ずにゲームを中断しますか?",
        button: "ゲームを中断する",
        onClick: () => {
          saveIsGameInProgress("false").then(() => {
            router.replace("/player");
          });
        },
      };
  return (
    <HeaderLayout
      left={<AppearanceSwitch />}
      right={
        <>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="gray" variant="outline">
                ゲーム終了
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <>
                <AlertDialog.Title>{alertContent.title}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  {alertContent.message}
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      キャンセル
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button
                      variant="solid"
                      color="red"
                      onClick={alertContent.onClick}
                    >
                      {alertContent.button}
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </>
      }
    />
  );
}
