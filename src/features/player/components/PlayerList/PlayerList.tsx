"use client";

import PlayerColorDot from "@/components/PlayerColorDot";
import { Label } from "@radix-ui/react-label";
import {
  Button,
  Card,
  Flex,
  Popover,
  Slider,
  Text,
  TextField,
} from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import styles from "./PlayerList.module.css";

type PlayerEditPopoverProps = {
  name: string;
  colorHue: number;
  editPlayer: (name: string, colorHue: number) => void;
};

type PlayerListProps = {
  playerList: PlayerSetting[];
  addPlayer: () => void;
  removePlayer: (idx: number) => void;
  editPlayer: (idx: number) => (name: string, colorHue: number) => void;
};

function PlayerEditPopover(props: PlayerEditPopoverProps) {
  const [value, setValue] = useState<PlayerSetting>({
    name: props.name,
    colorHue: props.colorHue,
  });

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft" color="jade">
          <FiEdit />
        </Button>
      </Popover.Trigger>

      <Popover.Content>
        <Flex direction="column" gap="2">
          <Flex direction="column">
            <Label htmlFor="player-name">
              <Text size="2" weight="medium">
                Player name
              </Text>
            </Label>
            <TextField.Root>
              <TextField.Input
                id="player-name"
                defaultValue={props.name}
                placeholder="input player name..."
                onChange={(e) => {
                  setValue({ ...value, name: e.target.value });
                }}
              />
            </TextField.Root>
          </Flex>
          <Flex direction="column">
            <Label htmlFor="player-color">
              <Text size="2" weight="medium">
                Player color
              </Text>
            </Label>
            <PlayerColorDot colorHue={value.colorHue} size={20} />
            <Slider
              id="player-color"
              color="jade"
              defaultValue={[props.colorHue]}
              onValueChange={(valueChanged) => {
                setValue({ ...value, colorHue: valueChanged[0] });
              }}
              max={360}
            />
          </Flex>
          <Popover.Close>
            <Button
              mt="2"
              color="jade"
              onClick={() => {
                props.editPlayer(value.name, value.colorHue);
              }}
            >
              Save
            </Button>
          </Popover.Close>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

export default function PlayerList({
  playerList,
  addPlayer,
  removePlayer,
  editPlayer,
}: PlayerListProps) {
  return (
    <Flex gap="2" direction="column">
      <Flex className={styles.scroll} pl="3" pr="3" gap="2">
        <Flex direction="column" width="100%" gap="1">
          {playerList.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              height="100%"
            >
              <Text size="4" color="gray">
                プレイヤーが登録されていません
              </Text>
              <Text size="2" color="gray">
                下のボタンよりプレイヤーを1人以上追加してください
              </Text>
            </Flex>
          ) : null}
          <AnimatePresence>
            {playerList.map((player, i) => (
              <motion.div
                key={`player${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
              >
                <Card>
                  <Flex
                    key={player.name}
                    align="center"
                    gap="4"
                    justify="between"
                  >
                    <Flex align="center" direction="row" gap="2">
                      <PlayerColorDot colorHue={player.colorHue} size={10} />
                      <Text size="2" className={styles.playerName}>
                        {player.name}
                      </Text>
                    </Flex>

                    <Flex align="center" gap="1">
                      <PlayerEditPopover
                        name={player.name}
                        colorHue={player.colorHue}
                        editPlayer={editPlayer(i)}
                      />
                      <Button
                        variant="soft"
                        color="gray"
                        onClick={() => {
                          removePlayer(i);
                        }}
                      >
                        <FiTrash />
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Flex>
      </Flex>
      <Button onClick={addPlayer} color="jade" variant="outline" size="2">
        <FiPlus size="20" />
        <Text>プレイヤーを追加</Text>
      </Button>
    </Flex>
  );
}
