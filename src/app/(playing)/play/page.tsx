"use client";

import PlayerSwitch from "@/features/scoresheet/components/PlayerSwitch";
import ScoresheetYahtzee from "@/features/scoresheet/components/ScoresheetYahtzee";
import ScoresheetYams from "@/features/scoresheet/components/ScoresheetYams";
import { db } from "@/libs/db";
import { Container } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function PlayPage() {
  const [rule, setRule] = useState<string | null>();
  const [playerList, setPlayerList] = useState<PlayerSetting[]>();
  const [displayingPlayerIdx, setDisplayingPlayerIdx] = useState<number>(0);

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
          <PlayerSwitch
            playerList={playerList}
            displayingPlayerIdx={displayingPlayerIdx}
            setDisplayingPlayerIdx={setDisplayingPlayerIdx}
          />
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
