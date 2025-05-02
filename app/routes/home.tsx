import { useNavigate } from "react-router";
import { getCurrentScores } from "~/features/playing/req/index.client";
import type { Route } from "./+types/home";
import { use, useEffect } from "react";

export function meta() {
  return [{ title: "yathzee-scoresheet" }];
}

export async function clientLoader() {
  const scores = await getCurrentScores();
  return { scores };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loaderData.scores.length === 0) {
      navigate("/settings/players");
    } else {
      navigate("/game");
    }
  }, [loaderData.scores, navigate]);
}
