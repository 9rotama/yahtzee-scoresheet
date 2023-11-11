"use client";

import MovePageButton from "@/components/MovePageButton";
import PlayerList from "@/features/player/components/PlayerList";
import usePlayerList from "@/features/player/hooks/usePlayerList";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function PlayerPage() {
  const { playerList, addPlayer, removePlayer, editPlayer, savePlayerList } =
    usePlayerList();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
              <PlayerList
                playerList={playerList}
                addPlayer={addPlayer}
                removePlayer={removePlayer}
                editPlayer={editPlayer}
              />
            </div>
          </Flex>
          <Link
            href="/rule"
            onClick={() => {
              savePlayerList();
            }}
          >
            <MovePageButton direction="next">
              <Text size="2" weight="bold">
                決定してルール選択
              </Text>
            </MovePageButton>
          </Link>
        </Flex>
      </Container>
    </motion.div>
  );
}
