export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  genre: string;
}

export interface TopArtist {
  name: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
}

interface SideArtist extends Artist {
  isShowingFollowers: boolean;
}

export type Side = "left" | "right";
