import { useArtistsStore } from "@/app/(artists)/providers/artists-store";
import { readFile } from "@/app/actions/file-actions";
import { useGameStore } from "@/app/providers/game-store";
import { useEffect } from "react";

export function useArtist() {
  const { setIsGuessCorrect } = useGameStore((state) => state);
  const { remainingArtists, setRemainingArtists, leftArtist, rightArtist } =
    useArtistsStore((state) => state);

  useEffect(() => {
    if (remainingArtists && remainingArtists.length > 0) return;

    const getArtists = async () => {
      setRemainingArtists(await readFile("/public/artists.json"));
    };

    getArtists();
  }, [remainingArtists, setRemainingArtists]);

  useEffect(() => {
    if (!leftArtist || !rightArtist || !remainingArtists) return;

    setRemainingArtists(
      remainingArtists.filter(
        (artist) =>
          artist.name !== leftArtist.name && artist.name !== rightArtist?.name,
      ),
    );
  }, [leftArtist, rightArtist, setRemainingArtists]);

  useEffect(() => {
    // reset guess state
    setTimeout(() => {
      setIsGuessCorrect(null);
    }, 1000);
  }, [leftArtist, rightArtist, setIsGuessCorrect]);
}
