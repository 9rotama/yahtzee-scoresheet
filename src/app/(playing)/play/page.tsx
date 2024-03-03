"use client";

import PlayerColorDot from "@/components/PlayerColorDot";
import ScoresheetYahtzee from "@/features/scoresheet/components/ScoresheetYahtzee";
import ScoresheetYams from "@/features/scoresheet/components/ScoresheetYams";
import { db } from "@/libs/db";
import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import styles from "./page.module.css";

export default function PlayPage() {
  const [rule, setRule] = useState<string | null>();
  const [playerList, setPlayerList] = useState<PlayerSetting[]>();
  const [displayingPlayerIdx, setDisplayingPlayerIdx] = useState<number>(0);

  function prevPlayer() {
    if (!playerList) return;
    setDisplayingPlayerIdx((curr) =>
      curr === 0 ? playerList.length - 1 : curr - 1,
    );
  }
  function nextPlayer() {
    if (!playerList) return;
    setDisplayingPlayerIdx((curr) =>
      curr === playerList.length - 1 ? 0 : curr + 1,
    );
  }

  useEffect(() => {
    db.rule.toArray().then((data) => {
      setRule(data[0].rule);
    });
    db.playerList.toArray().then((data) => {
      setPlayerList(data);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={styles.bottom}
    >
      <Container p="2" size="2">
        {playerList ? (
          <Flex
            align="center"
            justify="between"
            mb="5"
            mt="4"
            position="relative"
          >
            <Button color="jade" variant="soft" onClick={prevPlayer}>
              <FiArrowLeft />
            </Button>
            <AnimatePresence>
              <Box position="relative">
                <motion.div
                  key={playerList[displayingPlayerIdx].name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Flex gap="3" align="center">
                    <PlayerColorDot
                      colorHue={playerList[displayingPlayerIdx].colorHue}
                      size={10}
                    />
                    <Text size="5">{playerList[displayingPlayerIdx].name}</Text>
                  </Flex>
                </motion.div>
              </Box>
            </AnimatePresence>
            <Button color="jade" variant="soft" onClick={nextPlayer}>
              <FiArrowRight />
            </Button>
          </Flex>
        ) : null}

        {rule ? (
          rule === "yahtzee" ? (
            <ScoresheetYahtzee />
          ) : (
            <ScoresheetYams />
          )
        ) : null}
      </Container>
    </motion.div>
  );
}
