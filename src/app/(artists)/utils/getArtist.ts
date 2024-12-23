import { Artist } from "@/app/types";
import getSpotifyToken from "@/app/utils/getSpotifyToken";
import axios, { AxiosError } from "axios";

async function getArtist(
  artistName: string,
  accessToken?: string,
  onTokenError?: (newToken: string) => void,
) {
  try {
    const {
      data: {
        artists: { items },
      },
    } = await axios.get(
      `https://api.spotify.com/v1/search/?q=${artistName}&type=artist&limit=1`,
      accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : undefined,
    );

    const artist: Artist = {
      id: items[0].id,
      name: items[0].name,
      followers: items[0].followers.total,
      genre: items[0].genres[0],
      image: items[0].images[0]?.url,
    };

    return artist;
  } catch (err) {
    if (err instanceof AxiosError && err.status === 401) {
      const newAccessToken = await getSpotifyToken();
      if (onTokenError) onTokenError(newAccessToken);
      return getArtist(artistName, newAccessToken);
    }
    console.log(err);
    return null;
  }
}

export default getArtist;
