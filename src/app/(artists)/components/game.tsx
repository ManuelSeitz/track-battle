"use client";

import { useArtistsStore } from "@/app/(artists)//providers/artists-store";
import ArtistCard from "@/app/(artists)/components/artist-card";
import { useArtistsGame } from "@/app/(artists)/hooks/useArtistsGame";
import HigherLowerButton from "@/app/components/higher-lower-button";
import { useGameStore } from "@/app/providers/game-store";

function Game() {
  const { isGuessCorrect } = useGameStore((state) => state);
  const { handleComparison, isComparing } = useArtistsGame();
  const { leftArtist, isLeftArtistLoading, rightArtist, isRightArtistLoading } =
    useArtistsStore((state) => state);

  if (!leftArtist || !rightArtist) return;

  return (
    <div className="relative flex h-full min-h-[calc(100dvh-56px)] w-full items-center justify-center gap-9 max-xl:gap-6 max-lg:flex-col max-lg:gap-0">
      <ArtistCard artist={leftArtist} isLoading={isLeftArtistLoading} />
      <HigherLowerButton
        handleHigher={() => handleComparison("higher")}
        handleLower={() => handleComparison("lower")}
        isComparing={isComparing}
        isGuessCorrect={isGuessCorrect}
      />
      <ArtistCard artist={rightArtist} isLoading={isRightArtistLoading} />
    </div>
  );
}

export default Game;
