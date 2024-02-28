"use client";

import MovePageButton from "@/components/MovePageButton";
import {
  Box,
  Container,
  Flex,
  Heading,
  Link as RadixThemeLink,
  Text,
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CreditsPage() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container p="2" size="2">
        <Flex align="center" direction="column" gap="9" pt="6">
          <Heading size="7" weight="bold">
            クレジット
          </Heading>
          <Flex align="center" direction="column" gap="4">
            <Heading size="4" weight="regular">
              イラスト
            </Heading>
            <Box>
              <RadixThemeLink
                color="jade"
                href="https://dac.tsukuba.ac.jp/radd/joint-base/manga/illust/"
              >
                筑波大学 RADD 発達障害啓発マンガのイラストギャラリー
              </RadixThemeLink>
            </Box>
          </Flex>
          <Flex align="center" direction="column" gap="4">
            <Heading size="4" weight="regular">
              制作
            </Heading>
            <Box>
              <RadixThemeLink color="jade" href="https://9rtm.com">
                9rotama
              </RadixThemeLink>
            </Box>
          </Flex>
          <div
            onClick={() => {
              router.back();
            }}
          >
            <MovePageButton color="gray" direction="prev" variant="outline">
              <Text size="2" weight="bold">
                戻る
              </Text>
            </MovePageButton>
          </div>
        </Flex>
      </Container>
    </motion.div>
  );
}
