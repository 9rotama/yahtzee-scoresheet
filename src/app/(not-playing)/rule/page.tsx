"use client";
import {
  Button,
  Container,
  Flex,
  Heading,
  Select,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import styles from "./page.module.css";

type Props = {};

export default function RulePage() {
  return (
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
          <Select.Root size="3" defaultValue="yathzee">
            <Select.Trigger />
            <Select.Content color="jade">
              <Select.Item value="yathzee">ヤッツィー</Select.Item>
              <Select.Item value="yams">ヤムス</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex align="center" gap="1" direction="column">
          <Link href="" className={styles.fullWidth}>
            <Button
              size="4"
              color="jade"
              radius="full"
              className={styles.fullWidth}
            >
              <Text size="2" weight="bold">
                ゲームを始める
              </Text>
              <FiArrowRight />
            </Button>
          </Link>
          <Link href="/player">
            <Button
              size="4"
              color="gray"
              radius="full"
              variant="outline"
              className={styles.fullWidth}
            >
              <FiArrowLeft />
              <Text size="2" weight="bold">
                プレイヤー登録に戻る
              </Text>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
