"use client";

import { createGameStore, GameStore } from "@/app/store/game";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type GameStoreApi = ReturnType<typeof createGameStore>;

export const GameStoreContext = createContext<GameStoreApi | undefined>(
  undefined,
);

export const GameStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storeRef = useRef<GameStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createGameStore();
  }

  return (
    <GameStoreContext.Provider value={storeRef.current}>
      {children}
    </GameStoreContext.Provider>
  );
};

export const useGameStore = <T,>(selector: (store: GameStore) => T): T => {
  const gameStoreContext = useContext(GameStoreContext);

  if (!gameStoreContext) {
    throw new Error(`useGameStore must be used within GameStoreProvider`);
  }

  return useStore(gameStoreContext, selector);
};
