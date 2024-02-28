import Image from "next/image";

type Props = {
  size: number;
};

export default function Logo({ size }: Props) {
  return <Image src="/dice.png" alt="logo" width={size} height={size} />;
}
