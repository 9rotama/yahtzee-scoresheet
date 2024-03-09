"use client";

import MovePageButton from "@/components/MovePageButton";
import PlayerColorDot from "@/components/PlayerColorDot";
import calcScoresYahtzee from "@/features/scoresheet/utils/calcScoresYahtzee";
import calcScoresYams from "@/features/scoresheet/utils/calcScoresYams";
import { db } from "@/libs/db";
import { Container, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ResultsPage() {
  const [rule, setRule] = useState<string | null>(null);
  const [playerList, setPlayerList] = useState<PlayerSetting[]>([]);
  const [displayingPlayerIdx, setDisplayingPlayerIdx] = useState<number>(0);
  const [allPlayerScores, setAllPlayerScores] = useState<PlayerScores[]>([]);
  const totalScores = useMemo<number[] | undefined>(() => {
    if (rule === "yahtzee") {
      return allPlayerScores.map(
        (scores) => calcScoresYahtzee(scores.yahtzee).total,
      );
    } else if (rule === "yams") {
      return allPlayerScores.map((scores) => calcScoresYams(scores.yams).total);
    }
  }, [rule, allPlayerScores]);
  const ranking = useMemo<number[] | undefined>(() => {
    return totalScores
      ?.map((_, i) => i)
      .sort((a, b) => totalScores[b] - totalScores[a]);
  }, [totalScores]);

  useEffect(() => {
    let rule: string;
    let playerList: PlayerSetting[];
    let currScoresYahtzee: ScoreSelectValuesYahtzee[];
    let currScoresYams: ScoreSelectValuesYams[];

    db.rule
      .toArray()
      .then((ruleData) => {
        rule = ruleData[0].rule;
        setRule(rule);
        return db.playerList.toArray();
      })
      .then((playerListData) => {
        playerList = playerListData;
        setPlayerList(playerList);
        return db.currScoresYahtzee.toArray();
      })
      .then((currScoresYahtzeeData) => {
        currScoresYahtzee = currScoresYahtzeeData;

        return db.currScoresYams.toArray();
      })
      .then((currScoresYamsData) => {
        currScoresYams = currScoresYamsData;
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container p="2" size="2">
        <Flex align="center" direction="column" gap="5" width="100%">
          <Image
            alt="プレイヤー選択"
            src="/results.png"
            width={285}
            height={246}
          />
          <Heading size="5" weight="bold">
            結果
          </Heading>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>順位</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>プレイヤー</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>総得点</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body></Table.Body>
            {ranking?.map((playerIdx, i) => (
              <Table.Row key={playerList[playerIdx].name}>
                <Table.Cell>
                  <Text>{i + 1}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Flex direction="row" align="center" gap="3">
                    <PlayerColorDot
                      colorHue={playerList[playerIdx].colorHue}
                      size={6}
                    />
                    <Text>{playerList[playerIdx].name}</Text>
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Text>{totalScores ? totalScores[playerIdx] : null}</Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Root>
          <Flex direction="column" gap="2">
            <Link href="/play">
              <MovePageButton variant="outline" color="jade" direction="next">
                <Text size="2" weight="bold">
                  同じ設定 / 同じプレイヤーでプレイ
                </Text>
              </MovePageButton>
            </Link>
            <Link href="/player">
              <MovePageButton variant="outline" color="gray" direction="prev">
                <Text size="2" weight="bold">
                  設定画面に戻る
                </Text>
              </MovePageButton>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </motion.div>
  );
}
