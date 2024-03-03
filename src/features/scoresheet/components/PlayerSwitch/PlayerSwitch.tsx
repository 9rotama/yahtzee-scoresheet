import PlayerColorDot from "@/components/PlayerColorDot";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type Props = {
  playerList: PlayerSetting[];
  displayingPlayerIdx: number;
  setDisplayingPlayerIdx: Dispatch<SetStateAction<number>>;
};

export default function PlayerSwitch({
  playerList,
  displayingPlayerIdx,
  setDisplayingPlayerIdx,
}: Props) {
  function prevPlayer() {
    if (!playerList) return;
    setDisplayingPlayerIdx((curr) =>
      curr === 0 ? playerList.length - 1 : curr - 1,
    );
  }
  function nextPlayer() {
    if (!playerList) return;
    setDisplayingPlayerIdx((curr) =>
      curr === playerList.length - 1 ? 0 : curr + 1,
    );
  }
  return (
    <Flex align="center" justify="between" mb="5" mt="4" position="relative">
      <Button color="jade" variant="soft" onClick={prevPlayer}>
        <FiArrowLeft />
      </Button>
      <AnimatePresence>
        <Box position="relative">
          <motion.div
            key={playerList[displayingPlayerIdx].name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex gap="3" align="center">
              <PlayerColorDot
                colorHue={playerList[displayingPlayerIdx].colorHue}
                size={10}
              />
              <Text size="5">{playerList[displayingPlayerIdx].name}</Text>
            </Flex>
          </motion.div>
        </Box>
      </AnimatePresence>
      <Button color="jade" variant="soft" onClick={nextPlayer}>
        <FiArrowRight />
      </Button>
    </Flex>
  );
}
