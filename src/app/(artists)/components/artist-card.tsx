"use client";

import getArtistWikipediaUrl from "@/app/(artists)/actions/artist-actions";
import Card from "@/app/components/card";
import { SideArtist } from "@/app/types";
import { useEffect, useState } from "react";

function ArtistCard({
  artist,
  isLoading,
}: {
  artist: SideArtist;
  isLoading: boolean;
}) {
  const [wikipediaUrl, setWikipediaUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      const url = await getArtistWikipediaUrl(artist.name);
      setWikipediaUrl(url);
    })();
  }, [artist.name]);

  return (
    <Card
      imageSrc={artist.image}
      cardTitle={{ title: artist.name, href: wikipediaUrl }}
      subtitle={artist.genre}
      quantity={artist.followers}
      showQuantity={artist.isShowingFollowers}
      isLoading={isLoading}
    />
  );
}

export default ArtistCard;
