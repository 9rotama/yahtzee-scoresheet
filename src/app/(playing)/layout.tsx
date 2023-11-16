import PlayingHeader from "@/components/PlayingHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PlayingHeader />
      {children}
    </>
  );
}
