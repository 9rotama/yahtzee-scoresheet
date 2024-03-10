"use client";

import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FiAlignJustify } from "react-icons/fi";
import AppearanceSwitch from "../AppearanceSwitch";
import HeaderLayout from "../HeaderLayout";

function DropdownContent() {
  return (
    <DropdownMenu.Content color="jade">
      <DropdownMenu.Item>
        <Text>プレー履歴</Text>
      </DropdownMenu.Item>
      <Link href="/credits">
        <DropdownMenu.Item>
          <Text>クレジット</Text>
        </DropdownMenu.Item>
      </Link>
    </DropdownMenu.Content>
  );
}

export default function DefaultHeader() {
  return (
    <HeaderLayout
      left={<AppearanceSwitch />}
      right={
        <>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" color="gray">
                <FiAlignJustify size={20} />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownContent />
          </DropdownMenu.Root>
        </>
      }
    />
  );
}
