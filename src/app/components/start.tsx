"use client";

import { useArtistsStore } from "@/app/(artists)/providers/artists-store";
import Button from "@/app/components/button";

function Start() {
  const { handleArtistChange } = useArtistsStore((state) => state);

  const startGame = () => {
    handleArtistChange("left");
    handleArtistChange("right");
  };

  return (
    <div className="flex flex-col items-center gap-4 max-md:gap-6">
      <div className="space-y-6 text-center">
        <h1 className="text-7xl font-bold uppercase tracking-wide">
          Higher or Lower
        </h1>
        <span className="text-4xl font-semibold tracking-wide text-primary-500">
          Artist Edition
        </span>
      </div>
      <p className="text-pretty text-center text-2xl text-neutral-200">
        ¡Adivina si el artista tiene más o menos seguidores!
      </p>
      <Button className="mt-3 flex items-center gap-2" onClick={startGame}>
        Comenzar
      </Button>
    </div>
  );
}

export default Start;
