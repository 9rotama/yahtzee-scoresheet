"use client";

import PlayingHeader from "@/components/PlayingHeader";
import { getPlayerList } from "@/features/player/libs/indexedDbPlayer";
import { getRule } from "@/features/ruleSelect/libs/indexedDbRule";
import PlayerSwitch from "@/features/scoreSheet/components/PlayerSwitch";
import ScoreSheetYahtzee from "@/features/scoreSheet/components/ScoreSheetYahtzee";
import ScoreSheetYams from "@/features/scoreSheet/components/ScoreSheetYams";
import {
  getCurrScoresYahtzee,
  getCurrScoresYams,
  saveCurrScoresYahtzee,
  saveCurrScoresYams,
} from "@/features/scoreSheet/libs/indexedDbScoreSheet";
import { Container } from "@radix-ui/themes";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function PlayPage() {
  const [rule, setRule] = useState<string | null>(null);
  const [playerList, setPlayerList] = useState<PlayerSetting[]>([]);
  const [displayingPlayerIdx, setDisplayingPlayerIdx] = useState<number>(0);
  const [allPlayerScores, setAllPlayerScores] = useState<PlayerScores[]>([]);
  const scoreSheetOpacity = useMotionValue(1);
  const scoreSheetX = useMotionValue(0);
  const isFinishButtonEnabled: boolean =
    rule === "yahtzee"
      ? !allPlayerScores
          .map((playerScore) => {
            for (const key in playerScore.yahtzee) {
              if (playerScore.yahtzee[key as YahtzeeCategories] === "none")
                return false;
            }
            return true;
          })
          .includes(false)
      : rule === "yams"
      ? !allPlayerScores
          .map((playerScore) => {
            for (const key in playerScore.yams) {
              if (playerScore.yams[key as YamsCategories] === "none")
                return false;
            }
            return true;
          })
          .includes(false)
      : true;

  useEffect(() => {
    function animateEntireSheet() {
      scoreSheetOpacity.set(0.5);
      scoreSheetX.set(20);

      const opacityAnimation = animate(scoreSheetOpacity, 1, { duration: 0.3 });
      const xAnimation = animate(scoreSheetX, 0, { duration: 0.3 });

      opacityAnimation.play();
      xAnimation.play();
    }

    animateEntireSheet();

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
      saveCurrScoresYahtzee(
        displayingPlayerIdx,
        playerList[displayingPlayerIdx].name,
        category,
        newValue,
      );
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
      saveCurrScoresYams(
        displayingPlayerIdx,
        playerList[displayingPlayerIdx].name,
        category,
        newValue,
      );
    };
  }

  useEffect(() => {
    async function initializeValues() {
      const rule = await getRule();
      setRule(rule);
      const playerList = await getPlayerList();
      setPlayerList(playerList);

      const currScoresYahtzee = await getCurrScoresYahtzee();
      const currScoresYams = await getCurrScoresYams();
      setAllPlayerScores(
        [...new Array(playerList.length)].map((_, i) => ({
          yahtzee: { ...currScoresYahtzee[i] },
          yams: { ...currScoresYams[i] },
        })),
      );
    }

    initializeValues();
  }, []);

  return (
    <>
      <PlayingHeader isFinishButtonEnabled={isFinishButtonEnabled} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={styles.bottom}
      >
        <Container p="2" size="1">
          {playerList.length !== 0 ? (
            <PlayerSwitch
              playerList={playerList}
              displayingPlayerIdx={displayingPlayerIdx}
              setDisplayingPlayerIdx={setDisplayingPlayerIdx}
            />
          ) : null}
          <motion.div style={{ opacity: scoreSheetOpacity, x: scoreSheetX }}>
            {allPlayerScores.length !== 0 && rule ? (
              rule === "yahtzee" ? (
                <ScoreSheetYahtzee
                  scores={allPlayerScores[displayingPlayerIdx].yahtzee}
                  setScores={setScoresYahtzee}
                />
              ) : (
                <ScoreSheetYams
                  scores={allPlayerScores[displayingPlayerIdx].yams}
                  setScores={setScoresYams}
                />
              )
            ) : null}
          </motion.div>
        </Container>
      </motion.div>
    </>
  );
}
