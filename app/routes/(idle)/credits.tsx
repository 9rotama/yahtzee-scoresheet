export function meta() {
  return [{ title: "クレジット | yathzee-scoresheet" }];
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-bold">{title}</h2>
      <div className="text-sm">{children}</div>
    </section>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-4 break-all"
    >
      {children}
    </a>
  );
}

export default function Credits() {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold text-center mt-4">クレジット</h1>

      <div className="flex flex-col gap-8 mt-8">
        <Section title="開発">
          <ExternalLink href="https://github.com/9rotama">9rotama</ExternalLink>
        </Section>

        <Section title="ソースコード">
          <ExternalLink href="https://github.com/9rotama/yahtzee-scoresheet">
            github.com/9rotama/yahtzee-scoresheet
          </ExternalLink>
        </Section>

        <Section title="イラスト">
          <p>
            <ExternalLink href="https://dac.tsukuba.ac.jp/radd/joint-base/manga/illust/">
              発達障害啓発マンガのイラストギャラリー
            </ExternalLink>
            （RADD 発達障害学生支援プロジェクト）
          </p>
          <p className="text-muted-foreground mt-1">
            © 筑波大学ヒューマンエンパワーメント推進局（BHE）／ダックス
          </p>
        </Section>

        <Section title="アイコン">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="text-muted-foreground">アプリアイコン</dt>
            <dd>
              <ExternalLink href="https://github.com/microsoft/fluentui-emoji">
                Fluent Emoji
              </ExternalLink>
              （Microsoft, MIT License）を組み合わせて作成
            </dd>
            <dt className="text-muted-foreground">UI アイコン</dt>
            <dd>
              <ExternalLink href="https://lucide.dev">Lucide</ExternalLink>
              （ISC License）
            </dd>
          </dl>
        </Section>
      </div>
    </div>
  );
}
