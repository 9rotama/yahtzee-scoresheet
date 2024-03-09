import {
  MIN_SCORE_FOR_BONUS_YAMS,
  SCORE_SELECTS_YAMS,
} from "@/const/scoreSelects";
import { Flex, Table, Text } from "@radix-ui/themes";
import calcScoresYams from "../../utils/calcScoresYams";
import CellValueAutoUpdated from "../CellValueAutoUpdated";
import CellWithThumbnail from "../CellWithThumbnail";
import ScoreSelect from "../ScoreSelect";

type ScoresheetYamsProps = {
  scores: ScoreSelectValuesYams;
  setScores: (category: YamsCategories) => (newValue: string) => void;
};

export default function ScoresheetYams({
  scores,
  setScores,
}: ScoresheetYamsProps) {
  const { upperSectionSum, bonus, delta, total } = calcScoresYams(scores);

  const bonusDisplay =
    upperSectionSum > MIN_SCORE_FOR_BONUS_YAMS
      ? bonus.toString()
      : `(${upperSectionSum - MIN_SCORE_FOR_BONUS_YAMS})`;

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
                selects={SCORE_SELECTS_YAMS.aces}
                value={scores.aces}
                setValue={setScores("aces")}
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
                selects={SCORE_SELECTS_YAMS.twos}
                value={scores.twos}
                setValue={setScores("twos")}
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
                value={scores.fours}
                setValue={setScores("fours")}
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
                value={scores.fives}
                setValue={setScores("fives")}
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
                value={scores.sixes}
                setValue={setScores("sixes")}
                selects={SCORE_SELECTS_YAMS.sixes}
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
            <Table.Cell>プラス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.plus}
                setValue={setScores("plus")}
                selects={SCORE_SELECTS_YAMS.plus}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>マイナス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.minus}
                setValue={setScores("minus")}
                selects={SCORE_SELECTS_YAMS.minus}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>デルタ</Table.Cell>
            <Table.Cell align="right">
              <CellValueAutoUpdated slot={<Text weight="bold">{delta}</Text>} />
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
                value={scores.fourDice}
                setValue={setScores("fourDice")}
                selects={SCORE_SELECTS_YAMS.fourDice}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>フルハウス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.fullHouse}
                setValue={setScores("fullHouse")}
                selects={SCORE_SELECTS_YAMS.fullHouse}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>S.ストレート</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.sStraight}
                setValue={setScores("sStraight")}
                selects={SCORE_SELECTS_YAMS.sStraight}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>B.ストレート</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.lStraight}
                setValue={setScores("lStraight")}
                selects={SCORE_SELECTS_YAMS.lStraight}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ヤッツィー</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.yahtzee}
                setValue={setScores("yahtzee")}
                selects={SCORE_SELECTS_YAMS.yahtzee}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>リゴール</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                value={scores.rigole}
                setValue={setScores("rigole")}
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
