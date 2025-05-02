import { redirect } from "react-router";

export function meta() {
  return [{ title: "yathzee-scoresheet" }];
}

export default function Home() {
  redirect("/settings/players");
}
