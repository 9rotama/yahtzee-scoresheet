"use client";

import { Button, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { FiAlignJustify } from "react-icons/fi";
import HeaderLayout from "../HeaderLayout";

function DropdownContent() {
  return (
    <DropdownMenu.Content color="jade">
      <DropdownMenu.Item>プレー履歴</DropdownMenu.Item>
      <Link href="/credits">
        <DropdownMenu.Item>クレジット</DropdownMenu.Item>
      </Link>
    </DropdownMenu.Content>
  );
}

export default function DefaultHeader() {
  return (
    <HeaderLayout
      right={
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost" color="jade">
              <FiAlignJustify size={20} color="#000000" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownContent />
        </DropdownMenu.Root>
      }
    />
  );
}
