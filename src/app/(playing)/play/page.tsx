"use client";

import PlayingHeader from "@/components/PlayingHeader";
import { SCORE_NONE_YAHTZEE, SCORE_NONE_YAMS } from "@/const/scoreValues";
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
import { db } from "@/libs/db";
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
    let rule: string;
    let playerList: PlayerSetting[];
    let currScoresYahtzee: ScoreSelectValuesYahtzee[];
    let currScoresYams: ScoreSelectValuesYams[];

    const addNoneScoresYahtzee = async (playerNum: number) => {
      const add = async () => {
        try {
          await db.currScoresYahtzee.add({ ...SCORE_NONE_YAHTZEE });
        } catch (error) {
          throw new Error(`failed to add none scores: ${error}`);
        }
      };

      await db.currScoresYahtzee.clear();
      await Promise.all([...new Array(playerNum)].map(async () => add()));
    };

    const addNoneScoresYams = async (playerNum: number) => {
      const add = async () => {
        try {
          await db.currScoresYams.add({ ...SCORE_NONE_YAMS });
        } catch (error) {
          throw new Error(`failed to add none scores: ${error}`);
        }
      };

      await db.currScoresYams.clear();
      await Promise.all([...new Array(playerNum)].map(async () => add()));
    };

    getRule()
      .then((ruleData) => {
        rule = ruleData[0].rule;
        setRule(rule);
        return getPlayerList();
      })
      .then((playerListData) => {
        playerList = playerListData;
        setPlayerList(playerList);
        return getCurrScoresYahtzee();
      })
      .then((currScoresYahtzeeData) => {
        if (currScoresYahtzeeData.length !== 0) {
          currScoresYahtzee = currScoresYahtzeeData;
        } else if (currScoresYahtzeeData.length === 0) {
          currScoresYahtzee = [...new Array(playerList.length)].map(() => ({
            ...SCORE_NONE_YAHTZEE,
          }));
          addNoneScoresYahtzee(playerList.length);
        }
        return getCurrScoresYams();
      })
      .then((currScoresYamsData) => {
        if (currScoresYamsData.length !== 0) {
          currScoresYams = currScoresYamsData;
        } else if (currScoresYamsData.length === 0) {
          currScoresYams = [...new Array(playerList.length)].map(() => ({
            ...SCORE_NONE_YAMS,
          }));
          addNoneScoresYams(playerList.length);
        }
      })
      .then(() => {
        setAllPlayerScores(
          [...new Array(playerList.length)].map((_, i) => ({
            yahtzee: { ...currScoresYahtzee[i] },
            yams: { ...currScoresYams[i] },
          })),
        );
      });
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
