"use client";

import { Button, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { FiAlignJustify } from "react-icons/fi";
import Logo from "../Logo";
import styles from "./DefaultHeader.module.css";

function DropdownContent() {
  return (
    <DropdownMenu.Content>
      <DropdownMenu.Item>プレー履歴</DropdownMenu.Item>
    </DropdownMenu.Content>
  );
}

export default function DefaultHeader() {
  return (
    <Container className={styles.container} p="2" size="2">
      <Flex align="center" direction="row" justify="between">
        <div className={styles.headerLeft} />
        <div className={styles.headerCenter}>
          <Logo size={40} />
        </div>
        <div className={styles.headerRight}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" color="iris">
                <FiAlignJustify size={20} color="#000000" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownContent />
          </DropdownMenu.Root>
        </div>
      </Flex>
    </Container>
  );
}
