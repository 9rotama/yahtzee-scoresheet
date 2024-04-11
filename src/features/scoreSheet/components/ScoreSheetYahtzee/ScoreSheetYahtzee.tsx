import {
  MIN_SCORE_FOR_BONUS_YAHTZEE,
  SCORE_SELECTS_YAHTZEE,
} from "@/const/scoreSelects";
import { Flex, Table, Text } from "@radix-ui/themes";
import { useMemo } from "react";
import calcScoresYahtzee from "../../utils/calcScoresYahtzee";
import CellValueAutoUpdated from "../CellValueAutoUpdated";
import CellWithThumbnail from "../CellWithThumbnail";
import ScoreSelect from "../ScoreSelect/ScoreSelect";

type ScoreSheetYahtzeeProps = {
  scores: ScoreSelectValuesYahtzee;
  setScores: (category: YahtzeeCategories) => (newValue: string) => void;
};

export default function ScoreSheetYahtzee({
  scores,
  setScores,
}: ScoreSheetYahtzeeProps) {
  const { upperSectionSum, bonus, total } = useMemo(
    () => calcScoresYahtzee(scores),
    [scores],
  );

  const bonusDisplay =
    upperSectionSum > MIN_SCORE_FOR_BONUS_YAHTZEE
      ? bonus.toString()
      : `(${upperSectionSum - MIN_SCORE_FOR_BONUS_YAHTZEE})`;

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
                value={scores.aces}
                setValue={setScores("aces")}
                selects={SCORE_SELECTS_YAHTZEE.aces}
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
                value={scores.twos}
                setValue={setScores("twos")}
                selects={SCORE_SELECTS_YAHTZEE.twos}
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
                value={scores.threes}
                setValue={setScores("threes")}
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
                value={scores.fours}
                setValue={setScores("fours")}
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
                value={scores.fives}
                setValue={setScores("fives")}
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
                value={scores.sixes}
                setValue={setScores("sixes")}
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
                value={scores.threeDice}
                setValue={setScores("threeDice")}
                selects={SCORE_SELECTS_YAHTZEE.threeDice}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>フォーダイス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.fourDice}
                setValue={setScores("fourDice")}
                selects={SCORE_SELECTS_YAHTZEE.fourDice}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>フルハウス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.fullHouse}
                setValue={setScores("fullHouse")}
                selects={SCORE_SELECTS_YAHTZEE.fullHouse}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>S.ストレート</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.sStraight}
                setValue={setScores("sStraight")}
                selects={SCORE_SELECTS_YAHTZEE.sStraight}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>B.ストレート</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.lStraight}
                setValue={setScores("lStraight")}
                selects={SCORE_SELECTS_YAHTZEE.lStraight}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ヤッツィー</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.yahtzee}
                setValue={setScores("yahtzee")}
                selects={SCORE_SELECTS_YAHTZEE.yahtzee}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>チャンス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.chance}
                setValue={setScores("chance")}
                selects={SCORE_SELECTS_YAHTZEE.chance}
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
