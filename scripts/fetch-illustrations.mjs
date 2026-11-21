import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { get } from "@vercel/blob";

const directory = "app/assets";
const names = ["empty.png", "goal.png", "players.png", "rules.png"];
const missing = [];

for (const name of names) {
  try {
    await access(join(directory, name));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    missing.push(name);
  }
}

if (missing.length > 0) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "イラストの取得には BLOB_READ_WRITE_TOKEN が必要です。.env.local に設定するか、app/assets/ に画像を配置してください。",
    );
  }

  await mkdir(directory, { recursive: true });
  for (const name of missing) {
    const pathname = `illustrations/${name}`;
    const result = await get(pathname, { access: "private" });
    if (result?.statusCode !== 200) {
      throw new Error(`Vercel Blob から ${pathname} を取得できませんでした。`);
    }
    const bytes = await new Response(result.stream).arrayBuffer();
    await writeFile(join(directory, name), Buffer.from(bytes));
    console.log(`${pathname} を取得しました。`);
  }
}
