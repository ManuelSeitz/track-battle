import { useEffect, useState } from "react";
import { calculatePercentile } from "../actions/score-actions";
import { useGameStore } from "../providers/game-store";

export function useGameOver({ onReset }: { onReset: () => void }) {
  const { score, resetScore, setIsGameOver } = useGameStore((state) => state);
  const [percentage, setPercentage] = useState<number>();

  const resetGame = () => {
    resetScore();
    setIsGameOver(false);
    onReset();
  };

  useEffect(() => {
    (async () => {
      const percentiles = [10, 25, 50, 75, 90, 95];

      for (const percentile of percentiles) {
        if (score <= (await calculatePercentile(percentile))) {
          setPercentage(Number(((1 - percentile / 100) * 100).toFixed(2)));
          break;
        }
      }
    })();
  }, [score]);

  return { score, percentage, resetGame };
}
