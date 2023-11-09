import PlayerList from "@/features/player/components/PlayerList";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import styles from "./page.module.css";

export default function PlayerPage() {
  return (
    <Container p="2" size="2">
      <Flex align="center" direction="column" gap="9">
        <Flex
          align="center"
          direction="column"
          gap="5"
          className={styles.fullWidth}
        >
          <Image
            alt="プレイヤー選択"
            src="/player_select.png"
            width={285}
            height={246}
          />
          <Heading size="5" weight="regular">
            遊ぶ人を追加
          </Heading>
          <div className={styles.playerList}>
            <PlayerList />
          </div>
        </Flex>
        <Link href="/rule">
          <Button size="4" color="jade" radius="full">
            <Text size="2" weight="bold">
              決定してルール選択
            </Text>
            <FiArrowRight />
          </Button>
        </Link>
      </Flex>
    </Container>
  );
}
