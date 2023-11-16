"use client";
import MovePageButton from "@/components/MovePageButton";
import { rules } from "@/const/rules";
import { useRuleSelect } from "@/features/ruleSelect/hooks/useRuleSelect";
import { Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function RulePage() {
  const { saveRule, rule, setRule } = useRuleSelect();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container p="2" size="2">
        <Flex align="center" direction="column" gap="9">
          <Flex
            align="center"
            direction="column"
            gap="5"
            className={styles.fullWidth}
          >
            <Image
              alt="ルール選択"
              src="/rule_select.png"
              width={285}
              height={246}
            />
            <Heading size="5" weight="regular">
              ルールを選択
            </Heading>
            <Select.Root
              size="3"
              defaultValue={rules[0].id}
              value={rule}
              onValueChange={(value) => {
                setRule(value);
              }}
            >
              <Select.Trigger />
              <Select.Content color="jade">
                {rules.map((rule) => (
                  <Select.Item key={rule.id} value={rule.id}>
                    {rule.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex align="center" gap="1" direction="column">
            <Link
              href="/play"
              className={styles.fullWidth}
              onClick={() => {
                saveRule(rule);
              }}
            >
              <MovePageButton direction="next">
                <Text size="2" weight="bold">
                  ゲームを始める
                </Text>
              </MovePageButton>
            </Link>
            <Link
              href="/player"
              onClick={() => {
                saveRule(rule);
              }}
            >
              <MovePageButton direction="prev" color="gray" variant="outline">
                <Text size="2" weight="bold">
                  プレイヤー登録に戻る
                </Text>
              </MovePageButton>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </motion.div>
  );
}
