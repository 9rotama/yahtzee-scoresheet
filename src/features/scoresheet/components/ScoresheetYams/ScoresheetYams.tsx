import {
  MIN_SCORE_FOR_BONUS_YAMS,
  SCORE_SELECTS_YAMS,
} from "@/const/scoreSelects";
import { Flex, Table, Text } from "@radix-ui/themes";
import { useState } from "react";
import { makeZeroOrPositive } from "../../utils/makeZeroOrPositive";
import { parseScoreToInt } from "../../utils/parseScoreToInt";
import CellWithThumbnail from "../CellWithThumbnail";
import ScoreSelect from "../ScoreSelect";

export default function ScoresheetYams() {
  const rule = "yams";
  const [allScores, setAllScores] = useState<ScoreSelectValuesYams>({
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
    rigole: "none",
    lStraight: "none",
    yahtzee: "none",
  });
  const upperSectionSum =
    parseScoreToInt(allScores.aces) +
    parseScoreToInt(allScores.twos) +
    parseScoreToInt(allScores.threes) +
    parseScoreToInt(allScores.fours) +
    parseScoreToInt(allScores.fives) +
    parseScoreToInt(allScores.sixes);
  const bonus =
    upperSectionSum >= MIN_SCORE_FOR_BONUS_YAMS
      ? 30 + makeZeroOrPositive(upperSectionSum - MIN_SCORE_FOR_BONUS_YAMS)
      : 0;
  const bonusDisplay =
    upperSectionSum > MIN_SCORE_FOR_BONUS_YAMS
      ? bonus.toString()
      : `(${upperSectionSum - MIN_SCORE_FOR_BONUS_YAMS})`;
  const delta = makeZeroOrPositive(
    parseScoreToInt(allScores.plus) - parseScoreToInt(allScores.minus),
  );
  const lowerSectionSum =
    parseScoreToInt(allScores.fourDice) +
    parseScoreToInt(allScores.fullHouse) +
    parseScoreToInt(allScores.sStraight) +
    parseScoreToInt(allScores.rigole) +
    parseScoreToInt(allScores.lStraight) +
    parseScoreToInt(allScores.yahtzee);
  const total = upperSectionSum + bonus + delta + lowerSectionSum;

  function setValue(category: YamsCategories, newValue: string) {
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
                selects={SCORE_SELECTS_YAMS.aces}
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
                selects={SCORE_SELECTS_YAMS.twos}
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
                selects={SCORE_SELECTS_YAMS.threes}
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
                selects={SCORE_SELECTS_YAMS.fours}
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
                selects={SCORE_SELECTS_YAMS.fives}
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
                selects={SCORE_SELECTS_YAMS.sixes}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>合計</Table.Cell>
            <Table.Cell align="right">
              <Text weight="bold">{upperSectionSum}</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ボーナス</Table.Cell>
            <Table.Cell align="right">
              <Text weight="bold">{bonusDisplay}</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row>
            <Table.Cell>プラス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.plus}
                setValue={setValue}
                category="plus"
                selects={SCORE_SELECTS_YAMS.plus}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>マイナス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.minus}
                setValue={setValue}
                category="minus"
                selects={SCORE_SELECTS_YAMS.minus}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>デルタ</Table.Cell>
            <Table.Cell align="right">
              <Text weight="bold">{delta}</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row>
            <Table.Cell>フォーダイス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.fourDice}
                setValue={setValue}
                category="fourDice"
                selects={SCORE_SELECTS_YAMS.fourDice}
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
                selects={SCORE_SELECTS_YAMS.fullHouse}
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
                selects={SCORE_SELECTS_YAMS.sStraight}
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
                selects={SCORE_SELECTS_YAMS.lStraight}
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
                selects={SCORE_SELECTS_YAMS.yahtzee}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>リゴール</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                rule={rule}
                value={allScores.rigole}
                setValue={setValue}
                category="rigole"
                selects={SCORE_SELECTS_YAMS.yahtzee}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row color="jade">
            <Table.Cell>総合得点</Table.Cell>
            <Table.Cell align="right">
              <Text weight="bold">{total}</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
