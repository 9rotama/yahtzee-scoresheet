import { SCORE_SELECTS_YAMS } from "@/const/scoreSelects";
import { Flex, Table, Text } from "@radix-ui/themes";
import { useState } from "react";
import CellWithThumbnail from "../CellWithThumbnail";
import ScoreSelect from "../ScoreSelect";

type ScoreSelectValuesYams = { [key in YamsCategories]: string };

export default function ScoresheetYams() {
  const [selectValues, setSelectValues] = useState<ScoreSelectValuesYams>();
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
              <ScoreSelect name="aces" selects={SCORE_SELECTS_YAMS.aces} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_2.png"
              thumbnailAlt="dice_roll_2"
              slot={<Text>デュース</Text>}
            />
            <Table.Cell>
              <ScoreSelect name="twos" selects={SCORE_SELECTS_YAMS.twos} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_3.png"
              thumbnailAlt="dice_roll_3"
              slot={<Text>トレイ</Text>}
            />
            <Table.Cell>
              <ScoreSelect name="threes" selects={SCORE_SELECTS_YAMS.threes} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_4.png"
              thumbnailAlt="dice_roll_4"
              slot={<Text>フォー</Text>}
            />
            <Table.Cell>
              <ScoreSelect name="fours" selects={SCORE_SELECTS_YAMS.fours} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_5.png"
              thumbnailAlt="dice_roll_5"
              slot={<Text>ファイブ</Text>}
            />
            <Table.Cell>
              <ScoreSelect name="fives" selects={SCORE_SELECTS_YAMS.fives} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <CellWithThumbnail
              thumbnailSrc="/dice_roll/roll_6.png"
              thumbnailAlt="dice_roll_6"
              slot={<Text>シックス</Text>}
            />
            <Table.Cell>
              <ScoreSelect name="sixes" selects={SCORE_SELECTS_YAMS.sixes} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>合計</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ボーナス</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row>
            <Table.Cell>プラス</Table.Cell>
            <Table.Cell>
              <ScoreSelect name="fourDice" selects={SCORE_SELECTS_YAMS.plus} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>マイナス</Table.Cell>
            <Table.Cell>
              <ScoreSelect name="fourDice" selects={SCORE_SELECTS_YAMS.minus} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>デルタ</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row>
            <Table.Cell>フォーダイス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                name="fourDice"
                selects={SCORE_SELECTS_YAMS.fourDice}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>フルハウス</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                name="fullHouse"
                selects={SCORE_SELECTS_YAMS.fullHouse}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>S.ストレート</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                name="sStraight"
                selects={SCORE_SELECTS_YAMS.sStraight}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>B.ストレート</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                name="lStraight"
                selects={SCORE_SELECTS_YAMS.lStraight}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ヤッツィー</Table.Cell>
            <Table.Cell>
              <ScoreSelect
                name="yahtzee"
                selects={SCORE_SELECTS_YAMS.yahtzee}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>リゴール</Table.Cell>
            <Table.Cell>
              <ScoreSelect name="rigole" selects={SCORE_SELECTS_YAMS.rigole} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root variant="surface">
        <Table.Body>
          <Table.Row>
            <Table.Cell>総合得点</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
