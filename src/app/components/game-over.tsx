"use client";

import Button from "@/app/components/button";
import { FilledStarIcon, StarIcon } from "@/app/components/icons";
import { useGameOver } from "@/app/hooks/useGameOver";
import clsx from "clsx";

const starsPerPercentage = {
  "5": 5,
  "10": 5,
  "25": 4,
  "50": 3,
  "75": 2,
  "90": 1,
};

function GameOver({ onReset }: { onReset: () => void }) {
  const { score, percentage, resetGame } = useGameOver({ onReset });

  return (
    <div className="flex flex-col items-center gap-4 tracking-wide">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-semibold">Puntaje</h1>
        <span className="text-7xl font-bold text-primary-500">{score}</span>
      </div>
      <div className="flex items-center gap-2 text-neutral-400 [&>svg]:size-[72px] max-sm:[&>svg]:size-16">
        {Array.from({ length: 5 }, (_, i) =>
          percentage &&
          i <
            (starsPerPercentage[
              percentage.toString() as keyof typeof starsPerPercentage
            ] || 0) ? (
            <FilledStarIcon key={i} className="text-primary-500" />
          ) : (
            <StarIcon key={i} strokeWidth={1.5} />
          ),
        )}
      </div>
      <p
        className={clsx(
          "mt-1 text-lg text-primary-300 transition-opacity duration-500",
          percentage ? "opacity-100" : "opacity-0",
          percentage && percentage <= 10 ? "animate-glow" : "",
        )}
      >
        {!percentage
          ? `Cargando...`
          : percentage > 10
            ? `Estás dentro del ${percentage}% 🙂`
            : `👑 ¡Estás dentro del ${percentage}%!`}
      </p>
      <Button onClick={resetGame} className="mt-2">
        ¡No voy a rendirme!
      </Button>
    </div>
  );
}

export default GameOver;
