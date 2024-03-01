import {
  MIN_SCORE_FOR_BONUS_YAHTZEE,
  SCORE_SELECTS_YAHTZEE,
} from "@/const/scoreSelects";
import { Flex, Table, Text } from "@radix-ui/themes";
import { useState } from "react";
import { parseScoreToInt } from "../../utils/parseScoreToInt";
import CellValueAutoUpdated from "../CellValueAutoUpdated";
import CellWithThumbnail from "../CellWithThumbnail";
import ScoreSelect from "../ScoreSelect/ScoreSelect";

export default function ScoresheetYahtzee() {
  const rule = "yahtzee";
  const [allScores, setAllScores] = useState<ScoreSelectValuesYahtzee>({
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
  });
  const upperSectionSum =
    parseScoreToInt(allScores.aces) +
    parseScoreToInt(allScores.twos) +
    parseScoreToInt(allScores.threes) +
    parseScoreToInt(allScores.fours) +
    parseScoreToInt(allScores.fives) +
    parseScoreToInt(allScores.sixes);
  const bonus = upperSectionSum >= MIN_SCORE_FOR_BONUS_YAHTZEE ? 35 : 0;
  const bonusDisplay =
    upperSectionSum > MIN_SCORE_FOR_BONUS_YAHTZEE
      ? bonus.toString()
      : `(${upperSectionSum - MIN_SCORE_FOR_BONUS_YAHTZEE})`;
  const lowerSectionSum =
    parseScoreToInt(allScores.threeDice) +
    parseScoreToInt(allScores.fourDice) +
    parseScoreToInt(allScores.fullHouse) +
    parseScoreToInt(allScores.sStraight) +
    parseScoreToInt(allScores.lStraight) +
    parseScoreToInt(allScores.yahtzee);
  const total = upperSectionSum + bonus + lowerSectionSum;

  function setValue(category: YahtzeeCategories, newValue: string) {
    setAllScores((prev) => ({ ...prev, [category]: newValue }));
  }

  return (
    <Flex direction="column" gap="3">
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_1.png"
              thumbnailAlt="dice_roll_1"
              slot={<Text>エース</Text>}
            />
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                category="aces"
                selects={SCORE_SELECTS_YAHTZEE.aces}
                value={allScores.aces}
                setValue={setValue}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_2.png"
              thumbnailAlt="dice_roll_2"
              slot={<Text>デュース</Text>}
            />
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                category="twos"
                selects={SCORE_SELECTS_YAHTZEE.twos}
                value={allScores.twos}
                setValue={setValue}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_3.png"
              thumbnailAlt="dice_roll_3"
              slot={<Text>トレイ</Text>}
            />
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.threes}
                setValue={setValue}
                category="threes"
                selects={SCORE_SELECTS_YAHTZEE.threes}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_4.png"
              thumbnailAlt="dice_roll_4"
              slot={<Text>フォー</Text>}
            />
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.fours}
                setValue={setValue}
                category="fours"
                selects={SCORE_SELECTS_YAHTZEE.fours}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_5.png"
              thumbnailAlt="dice_roll_5"
              slot={<Text>ファイブ</Text>}
            />
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.fives}
                setValue={setValue}
                category="fives"
                selects={SCORE_SELECTS_YAHTZEE.fives}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_6.png"
              thumbnailAlt="dice_roll_6"
              slot={<Text>シックス</Text>}
            />
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.sixes}
                setValue={setValue}
                category="sixes"
                selects={SCORE_SELECTS_YAHTZEE.sixes}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>合計</Table.Cell>
            <Table.Cell align="right">
              <CellValueAutoUpdated
                slot={<Text weight="bold">{upperSectionSum}</Text>}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ボーナス</Table.Cell>
            <Table.Cell align="right">
              <CellValueAutoUpdated
                slot={<Text weight={"bold"}>{bonusDisplay}</Text>}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row>
            <Table.Cell>スリーダイス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.threeDice}
                setValue={setValue}
                category="threeDice"
                selects={SCORE_SELECTS_YAHTZEE.threeDice}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>フォーダイス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.fourDice}
                setValue={setValue}
                category="fourDice"
                selects={SCORE_SELECTS_YAHTZEE.fourDice}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>フルハウス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.fullHouse}
                setValue={setValue}
                category="fullHouse"
                selects={SCORE_SELECTS_YAHTZEE.fullHouse}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>S.ストレート</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.sStraight}
                setValue={setValue}
                category="sStraight"
                selects={SCORE_SELECTS_YAHTZEE.sStraight}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>B.ストレート</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.lStraight}
                setValue={setValue}
                category="lStraight"
                selects={SCORE_SELECTS_YAHTZEE.lStraight}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ヤッツィー</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.yahtzee}
                setValue={setValue}
                category="yahtzee"
                selects={SCORE_SELECTS_YAHTZEE.yahtzee}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row>
            <Table.Cell>総合得点</Table.Cell>
            <Table.Cell align="right">
              <CellValueAutoUpdated
                slot={<Text weight={"bold"}>{total}</Text>}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
