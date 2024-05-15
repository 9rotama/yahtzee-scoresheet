"use client";
import DefaultHeader from "@/components/DefaultHeader";
import { getIsGameInProgress } from "@/features/scoreSheet/libs/indexedDbIsGameInProgress";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    async function checkGame() {
      const gip = await getIsGameInProgress();
      if (gip) {
        router.replace("/play");
      }
    }
    checkGame();
  }, [router]);
  return (
    <>
      <DefaultHeader />
      {children}
    </>
  );
}
