"use client";

import Game from "@/app/(artists)/components/game";
import { useArtist } from "@/app/(artists)/hooks/useArtist";
import { useArtistsStore } from "@/app/(artists)/providers/artists-store";
import Aside from "@/app/components/aside";
import GameOver from "@/app/components/game-over";
import Start from "@/app/components/start";
import { useGameStore } from "@/app/providers/game-store";
import { usePlayer } from "./hooks/usePlayer";

function Home() {
  const { player } = usePlayer();
  const { score, isGameOver } = useGameStore((state) => state);

  const { leftArtist, rightArtist, handleArtistChange } = useArtistsStore(
    (state) => state,
  );

  useArtist();

  const onReset = () => {
    handleArtistChange("left");
    handleArtistChange("right");
  };

  return (
    <div className="relative m-auto grid h-full grid-cols-[250px_auto_250px] max-2xl:block">
      <Aside side="left" className="max-sm:h-fit">
        {leftArtist && rightArtist && (
          <div className="flex h-full flex-col justify-end max-md:justify-start">
            <div className="text-neutral-100">
              Record: <span>{player?.maxScore || 0}</span>{" "}
              {player?.maxScore === 1 ? "acierto" : "aciertos"}
            </div>
            <a href="/leaderboard" className="text-primary-600 hover:underline">
              👑 Mejores puntajes
            </a>
          </div>
        )}
      </Aside>
      <main className="grid h-full place-items-center px-4 max-lg:p-0">
        {isGameOver ? (
          <GameOver onReset={onReset} />
        ) : !leftArtist || !rightArtist ? (
          <Start />
        ) : (
          <Game />
        )}
      </main>
      <Aside side="right" className="max-sm:h-fit">
        {leftArtist && rightArtist && !isGameOver && (
          <div className="flex flex-col items-center">
            <span className="text-2xl max-lg:text-xl">Puntaje</span>
            <span className="text-5xl font-semibold text-primary-500 max-lg:text-[40px]">
              {score}
            </span>
          </div>
        )}
      </Aside>
      <footer className="absolute bottom-0 left-0 right-0 m-auto w-fit p-4 text-neutral-500">
        <p className="text-pretty text-center leading-tight max-lg:max-w-[400px] max-sm:text-sm">
          Los datos de los artistas han sido obtenidos a través del servicio de
          Spotify.
        </p>
      </footer>
    </div>
  );
}

export default Home;
