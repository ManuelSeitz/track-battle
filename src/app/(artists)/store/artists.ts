import { Artist, Side, SideArtist } from "@/app/types";
import { createStore } from "zustand/vanilla";

export type ArtistsState = {
  remainingArtists: Artist[] | null;
  leftArtist: SideArtist | null;
  isLeftArtistLoading: boolean;
  rightArtist: SideArtist | null;
  isRightArtistLoading: boolean;
};

export type ArtistsActions = {
  setRemainingArtists: (remainingArtists: Artist[] | null) => void;
  handleArtistChange: (side: Side) => void;
  setArtist: (side: Side, artist: SideArtist | null) => void;
};

export const defaultInitState: ArtistsState = {
  remainingArtists: null,
  leftArtist: null,
  isLeftArtistLoading: false,
  rightArtist: null,
  isRightArtistLoading: false,
};

export type ArtistsStore = ArtistsState & ArtistsActions;

export const createArtistsStore = (
  initState: ArtistsState = defaultInitState,
) => {
  return createStore<ArtistsStore>()((set, get) => ({
    ...initState,
    setRemainingArtists: (remainingArtists) => set({ remainingArtists }),
    handleArtistChange: (side) => {
      const remainingArtists = get().remainingArtists;
      const leftArtist = get().leftArtist;
      const rightArtist = get().rightArtist;

      if (!remainingArtists || remainingArtists.length === 0) return;

      const randomIndex = Math.floor(Math.random() * remainingArtists.length);
      const selectedArtist = remainingArtists[randomIndex];
      const opponent = side === "left" ? rightArtist : leftArtist;

      // set loading state for animation
      if (leftArtist && rightArtist && opponent?.isShowingFollowers) {
        const loadingProperty =
          side === "left" ? "isLeftArtistLoading" : "isRightArtistLoading";

        set({ [loadingProperty]: true });
        setTimeout(() => {
          set({ [loadingProperty]: false });
        }, 500);
      }

      set({
        [side === "left" ? "leftArtist" : "rightArtist"]: {
          ...selectedArtist,
          isShowingFollowers: !opponent?.isShowingFollowers,
        },
      });
    },
    setArtist: (side, artist) =>
      set({ [side === "left" ? "leftArtist" : "rightArtist"]: artist }),
  }));
};
