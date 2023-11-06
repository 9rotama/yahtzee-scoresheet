import DefaultHeader from "@/components/DefaultHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DefaultHeader />
      {children}
    </>
  );
}
