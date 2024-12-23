"use client";

import {
  ArtistsStore,
  createArtistsStore,
} from "@/app/(artists)/store/artists";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type ArtistsStoreApi = ReturnType<typeof createArtistsStore>;

export const ArtistsStoreContext = createContext<ArtistsStoreApi | undefined>(
  undefined,
);

export const ArtistsStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storeRef = useRef<ArtistsStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createArtistsStore();
  }

  return (
    <ArtistsStoreContext.Provider value={storeRef.current}>
      {children}
    </ArtistsStoreContext.Provider>
  );
};

export const useArtistsStore = <T,>(
  selector: (store: ArtistsStore) => T,
): T => {
  const artistsStoreContext = useContext(ArtistsStoreContext);

  if (!artistsStoreContext) {
    throw new Error(`useArtistsStore must be used within ArtistsStoreProvider`);
  }

  return useStore(artistsStoreContext, selector);
};
