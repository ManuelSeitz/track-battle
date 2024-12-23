import getArtist from "@/app/(artists)/utils/getArtist";
import getTopArtists from "@/app/(artists)/utils/getTopArtists";
import { Artist, TopArtist } from "@/app/types";
import { writeFile } from "fs/promises";

async function generateArtistsFile() {
  let page = 1;
  const MAX_PAGE = 15;
  const topArtists: TopArtist[] = [];
  const artists: Artist[] = [];
  let accessToken = "";

  while (page <= MAX_PAGE) {
    let newArtists = await getTopArtists(page);

    newArtists = newArtists.filter(
      (artist) =>
        !topArtists.some((topArtist) => topArtist.name === artist.name),
    );

    topArtists.push(...newArtists);

    for (const topArtist of newArtists) {
      const artist = await getArtist(
        topArtist.name,
        accessToken,
        (newToken) => (accessToken = newToken),
      );

      if (!artist || !artist.image) continue;

      artists.push(artist);
    }

    page++;
  }

  try {
    await writeFile("public/artists.json", JSON.stringify(artists));
    console.log("File created successfully");
  } catch (err) {
    console.log(err);
  }
}

generateArtistsFile();
