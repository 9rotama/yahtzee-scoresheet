"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Link as RadixThemeLink,
} from "@radix-ui/themes";
import { motion } from "framer-motion";

export default function CreditsPage() {
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
        </Flex>
      </Container>
    </motion.div>
  );
}
