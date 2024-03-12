"use client";

import PlayerSwitch from "@/features/scoresheet/components/PlayerSwitch";
import ScoresheetYahtzee from "@/features/scoresheet/components/ScoresheetYahtzee";
import ScoresheetYams from "@/features/scoresheet/components/ScoresheetYams";
import { db } from "@/libs/db";
import { Container } from "@radix-ui/themes";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type PlayerScores = {
  yahtzee: ScoreSelectValuesYahtzee;
  yams: ScoreSelectValuesYams;
};

export default function PlayPage() {
  const [rule, setRule] = useState<string | null>(null);
  const [playerList, setPlayerList] = useState<PlayerSetting[]>([]);
  const [displayingPlayerIdx, setDisplayingPlayerIdx] = useState<number>(0);
  const [allPlayerScores, setAllPlayerScores] = useState<PlayerScores[]>([]);
  const scoresheetOpacity = useMotionValue(1);
  const scoresheetX = useMotionValue(0);

  useEffect(() => {
    scoresheetOpacity.set(0.5);
    scoresheetX.set(20);

    const opacityAnimation = animate(scoresheetOpacity, 1, { duration: 0.3 });
    const xAnimation = animate(scoresheetX, 0, { duration: 0.3 });

    opacityAnimation.play();
    xAnimation.play();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayingPlayerIdx]);

  function setScoresYahtzee(category: YahtzeeCategories) {
    return (newValue: string) => {
      setAllPlayerScores((prev) => {
        if (!prev) return [];
        const newAllPlayerScores = [...prev];
        newAllPlayerScores[displayingPlayerIdx].yahtzee[category] = newValue;
        return newAllPlayerScores;
      });
    };
  }

  function setScoresYams(category: YamsCategories) {
    return (newValue: string) => {
      setAllPlayerScores((prev) => {
        if (!prev) return [];
        const newAllPlayerScores = [...prev];
        newAllPlayerScores[displayingPlayerIdx].yams[category] = newValue;
        return newAllPlayerScores;
      });
    };
  }

  useEffect(() => {
    db.rule.toArray().then((data) => {
      setRule(data[0].rule);
    });
    db.playerList.toArray().then((data) => {
      setPlayerList(data);
      setAllPlayerScores(
        [...new Array(data.length)].map(() => ({
          yahtzee: {
            aces: "none",
            twos: "none",
            threes: "none",
            fours: "none",
            fives: "none",
            sixes: "none",
            threeDice: "none",
            fourDice: "none",
            fullHouse: "none",
            sStraight: "none",
            lStraight: "none",
            chance: "none",
            yahtzee: "none",
          },
          yams: {
            aces: "none",
            twos: "none",
            threes: "none",
            fours: "none",
            fives: "none",
            sixes: "none",
            plus: "none",
            minus: "none",
            fourDice: "none",
            fullHouse: "none",
            sStraight: "none",
            lStraight: "none",
            rigole: "none",
            yahtzee: "none",
          },
        })),
      );
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
        {playerList.length !== 0 ? (
          <PlayerSwitch
            playerList={playerList}
            displayingPlayerIdx={displayingPlayerIdx}
            setDisplayingPlayerIdx={setDisplayingPlayerIdx}
          />
        ) : null}
        <motion.div style={{ opacity: scoresheetOpacity, x: scoresheetX }}>
          {allPlayerScores.length !== 0 && rule ? (
            rule === "yahtzee" ? (
              <ScoresheetYahtzee
                scores={allPlayerScores[displayingPlayerIdx].yahtzee}
                setScores={setScoresYahtzee}
              />
            ) : (
              <ScoresheetYams
                scores={allPlayerScores[displayingPlayerIdx].yams}
                setScores={setScoresYams}
              />
            )
          ) : null}
        </motion.div>
      </Container>
    </motion.div>
  );
}
