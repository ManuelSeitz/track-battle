import { findOrCreatePlayer } from "@/app/actions/player-actions";
import { Player as PlayerEntity } from "@prisma/client";
import { useEffect, useState } from "react";

interface Player extends PlayerEntity {
  maxScore: number | null;
}

export function usePlayer() {
  const [player, setPlayer] = useState<Player | null>();

  useEffect(() => {
    (async () => {
      setPlayer(await findOrCreatePlayer());
    })();
  }, []);

  return { player };
}
