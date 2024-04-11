import AppearanceProvider from "@/features/appearance/components/AppearanceProvider";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yahtzee ScoreSheet",
  description: "ヤッツィー記録表アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSansJp.className}>
        <AppearanceProvider>{children}</AppearanceProvider>
      </body>
    </html>
  );
}
