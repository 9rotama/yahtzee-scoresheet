import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import img from "~/assets/players.png";
import { Button } from "~/components/ui/button";
import { PlayerList } from "~/features/settings/components/player-list";

export default function Players() {
  return (
    <div className="flex flex-col items-center">
      <img src={img} alt="players" width={370} height={320} />

      <h1 className="text-lg font-bold text-center mt-4">プレイヤーを追加</h1>
      <div className="w-full mt-8">
        <PlayerList defaultPlayers={undefined} />
      </div>
      <Button
        variant="default"
        className="mt-16 w-full h-12 font-bold rounded-full"
        asChild
      >
        <Link to="/settings/rules">
          決定してルール選択へ <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
