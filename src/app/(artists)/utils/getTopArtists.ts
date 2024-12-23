import { TopArtist } from "@/app/types";
import { LAST_FM_API_KEY } from "@/config";
import axios from "axios";

interface Response {
  artists: {
    artist: TopArtist[];
  };
}

async function getTopArtists(page: number = 1) {
  const LIMIT = 50;
  const params = new URLSearchParams({
    method: "chart.gettopartists",
    api_key: LAST_FM_API_KEY as string,
    page: page.toString(),
    format: "json",
    limit: LIMIT.toString(),
  });

  const {
    data: {
      artists: { artist },
    },
  }: { data: Response } = await axios.get(
    `https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
  );

  return artist;
}

export default getTopArtists;
