import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import AppearanceSwitch from "../../features/appearance/components/AppearanceSwitch";
import HeaderLayout from "../HeaderLayout";

type PlayingHeaderProps = {
  isFinishButtonEnabled: boolean;
};

export default function PlayingHeader({
  isFinishButtonEnabled,
}: PlayingHeaderProps) {
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
              {isFinishButtonEnabled ? (
                <>
                  <AlertDialog.Title>ゲームを終了</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    終了後は得点の編集ができません。終了しますか?
                  </AlertDialog.Description>
                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        キャンセル
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Link href="results">
                        <Button variant="solid" color="red">
                          ゲームを終了する
                        </Button>
                      </Link>
                    </AlertDialog.Action>
                  </Flex>
                </>
              ) : (
                <>
                  <AlertDialog.Title>ゲームを終了</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    得点表に空きがあります。全ての得点を記録した後、再び終了ボタンを押してください🙏
                  </AlertDialog.Description>
                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        閉じる
                      </Button>
                    </AlertDialog.Cancel>
                  </Flex>
                </>
              )}
            </AlertDialog.Content>
          </AlertDialog.Root>
        </>
      }
    />
  );
}
