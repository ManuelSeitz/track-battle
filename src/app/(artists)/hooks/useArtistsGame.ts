import { useArtistsStore } from "@/app/(artists)/providers/artists-store";
import { saveGame } from "@/app/actions/player-actions";
import { useGameStore } from "@/app/providers/game-store";
import { useState } from "react";

export function useArtistsGame() {
  const [isComparing, setIsComparing] = useState(false);

  const { setIsGuessCorrect, setIsGameOver, score, increaseScore } =
    useGameStore((state) => state);
  const { leftArtist, rightArtist, setArtist, handleArtistChange } =
    useArtistsStore((state) => state);

  const compareArtists = async (
    compareTo: "left" | "right",
    comparison: "higher" | "lower",
  ) => {
    if (!leftArtist || !rightArtist) return;

    setArtist(compareTo, {
      ...(compareTo === "right" ? rightArtist : leftArtist),
      isShowingFollowers: true,
    });

    const isCorrect =
      comparison === "higher"
        ? compareTo === "right"
          ? leftArtist.followers <= rightArtist.followers
          : leftArtist.followers >= rightArtist.followers
        : compareTo === "right"
          ? leftArtist.followers >= rightArtist.followers
          : leftArtist.followers <= rightArtist.followers;

    setTimeout(() => {
      if (isCorrect) {
        increaseScore();

        setArtist(compareTo === "right" ? "left" : "right", {
          ...(compareTo === "right" ? leftArtist : rightArtist),
          isShowingFollowers: false,
        });

        setIsGuessCorrect(true);
        handleArtistChange(compareTo === "right" ? "left" : "right");
      } else {
        setIsGuessCorrect(false);

        setTimeout(async () => {
          setIsGameOver(true);
          await saveGame(score);

          setArtist("left", null);
          setArtist("right", null);
        }, 1200);
      }

      setIsComparing(false);
    }, 3000);
  };

  const handleComparison = (comparison: "higher" | "lower") => {
    if (!leftArtist || !rightArtist) return;

    setIsComparing(true);

    if (leftArtist.isShowingFollowers) {
      compareArtists("right", comparison);
    } else {
      compareArtists("left", comparison);
    }
  };

  return { handleComparison, isComparing };
}
