import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import img from "~/assets/rules.png";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  getCurrentRule,
  updateCurrentRule,
} from "~/features/settings/req/index.client";
import type { Route } from "./+types/rules";
import type { Rule } from "~/features/settings/models";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";

export async function clientLoader() {
  const data = await getCurrentRule();
  return data;
}

export function HydrateFallback() {
  return null;
}

export default function Rules({ loaderData }: Route.ComponentProps) {
  const [rule, setRule] = useState<Rule>(loaderData || { name: "yahtzee" });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateCurrentRule(rule);
      navigate("/play");
    },
  });

  const handleValueChange = useCallback((value: string) => {
    if (value === "yahtzee") {
      setRule({ name: "yahtzee" });
    } else if (value === "yams") {
      setRule({ name: "yams" });
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img src={img} alt="players" width={370} height={320} />

      <h1 className="text-lg font-bold text-center mt-4">ルールを選ぶ</h1>
      <div className="mt-8 max-w-52 ">
        <RadioGroup
          defaultValue={rule.name}
          className="flex flex-col gap-2"
          onValueChange={(v) => handleValueChange(v)}
        >
          <Button variant="outline" className="h-fit" asChild>
            <Label htmlFor="r1" className="flex flex-col gap-2 items-start">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yahtzee" id="r1" />
                <p className="font-bold">ヤッツィー</p>
              </div>
            </Label>
          </Button>
          <Button variant="outline" className="h-fit" asChild>
            <Label htmlFor="r2" className="flex flex-col gap-2 items-start ">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yams" id="r2" />
                <p className="font-bold">ヤムス</p>
              </div>
            </Label>
          </Button>
        </RadioGroup>
      </div>

      <div className="w-full mt-16">
        <Button
          variant="default"
          className="w-full h-12 font-bold rounded-full"
          onClick={() => {
            mutate();
          }}
        >
          ゲームを始める <ArrowRight />
        </Button>
        <Button
          variant="secondary"
          className="mt-2 w-full h-12 font-bold rounded-full"
          asChild
        >
          <Link to="/settings/players">
            <ArrowLeft />
            プレイヤー追加に戻る
          </Link>
        </Button>
      </div>
    </div>
  );
}
