import { SPOTIFY_ID_SECRET } from "@/config";
import axios from "axios";

async function getSpotifyToken() {
  const headers = {
    Authorization:
      "Basic " + Buffer.from(SPOTIFY_ID_SECRET as string).toString("base64"),
  };

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    { headers },
  );

  return data.access_token;
}

export default getSpotifyToken;
