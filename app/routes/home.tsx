import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCurrentScores } from "~/features/playing/req/index.client";
import type { Route } from "./+types/home";

export function meta() {
  return [{ title: "yathzee-scoresheet" }];
}

export async function clientLoader() {
  const scores = await getCurrentScores();
  return { scores };
}

export function HydrateFallback() {
  return null;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // push だと履歴に "/" が残り、ブラウザバックで "/" に戻るたび再リダイレクトされて戻れなくなる
    if (loaderData.scores.length === 0) {
      navigate("/settings/players", { replace: true });
    } else {
      navigate("/game", { replace: true });
    }
  }, [loaderData.scores, navigate]);
}
