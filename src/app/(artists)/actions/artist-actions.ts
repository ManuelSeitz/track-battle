"use server";

import axios from "axios";

async function getArtistWikipediaUrl(artistName: string) {
  const params = new URLSearchParams({
    action: "opensearch",
    search: artistName,
    format: "json",
  });

  const { data }: { data: string[][] } = await axios.get(
    `https://en.wikipedia.org/w/api.php?${params.toString()}`,
  );

  const keywords = [
    "duo",
    "artist",
    "band",
    "singer",
    "musician",
    "rapper",
    "group",
  ];

  if (!data[3]) return;

  const link = data[3].find((link) =>
    keywords.some((keyword) => link.toLowerCase().includes(keyword)),
  );

  return link || data[3][0];
}

export default getArtistWikipediaUrl;
