import { Width } from "./width";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="fixed top-0 left-0 right-0 flex flex-row items-center bg-background h-11 border-b">
      <Width>
        <div className="flex items-center justify-between">{children}</div>
      </Width>
    </header>
  );
}
