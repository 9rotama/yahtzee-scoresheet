import { Flex, Table } from "@radix-ui/themes";
import Image from "next/image";

type CellWithThumbnailProps = {
  thumbnailSrc: string;
  thumbnailAlt: string;
  slot: React.ReactNode;
};

export default function CellWithThumbnail({
  thumbnailSrc,
  thumbnailAlt,
  slot,
}: CellWithThumbnailProps) {
  return (
    <Table.Cell>
      <Flex align="center" gap="3">
        <Image width="20" height="20" src={thumbnailSrc} alt={thumbnailAlt} />
        {slot}
      </Flex>
    </Table.Cell>
  );
}
